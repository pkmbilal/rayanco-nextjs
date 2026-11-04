-- Rayanco: initial schema, RLS, triggers.
-- See CLAUDE.md §5 (data model), §3.5 (listing URLs never die), §8a (image columns).

create extension if not exists pgcrypto;

-- Helpers live in a non-exposed schema so they aren't callable via the REST API.
create schema if not exists private;

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.listing_status as enum ('draft','pending','available','reserved','sold','archived');
create type public.user_role as enum ('owner','staff');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role public.user_role not null default 'staff',
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name_en text not null,
  name_ar text,
  description_en text,
  description_ar text,
  seo_title text,
  seo_description text,
  sort int not null default 0
);

create sequence public.listing_ref_seq;

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  ref_code text unique not null
    default ('RY-' || lpad(nextval('public.listing_ref_seq')::text, 4, '0')),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category_id uuid not null references public.categories,
  title_en text not null,
  title_ar text,
  make text,
  model text,
  year int check (year between 1900 and 2100),
  condition text check (condition in ('working','needs_repair','for_scrap')),
  hours_or_km int check (hours_or_km >= 0),
  capacity text,
  location text,
  quantity int not null default 1 check (quantity >= 1),
  price_sar numeric check (price_sar >= 0),
  price_on_request boolean not null default false,
  negotiable boolean not null default true,
  description_en text,
  description_ar text,
  status public.listing_status not null default 'draft',
  view_count int not null default 0,
  created_by uuid references auth.users on delete set null default auth.uid(),
  published_at timestamptz,
  sold_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index listings_status_category_idx on public.listings (status, category_id);
create index listings_created_by_idx on public.listings (created_by);
create index listings_published_at_idx on public.listings (published_at desc);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings on delete cascade,
  r2_key text not null,
  thumb_key text,
  width int,
  height int,
  bytes int,
  format text not null default 'webp',
  alt_text text,
  sort_order int not null default 0
);

create index listing_images_listing_sort_idx on public.listing_images (listing_id, sort_order);

-- Private data: separate table so a public query can never leak it.
create table public.listing_private (
  listing_id uuid primary key references public.listings on delete cascade,
  seller_source text,
  cost_sar numeric,
  internal_notes text
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings on delete set null,
  name text check (char_length(name) <= 200),
  phone text check (char_length(phone) <= 40),
  message text check (char_length(message) <= 4000),
  channel text not null check (channel in ('form','whatsapp_click','call_click')),
  created_at timestamptz not null default now()
);

create index enquiries_listing_idx on public.enquiries (listing_id);
create index enquiries_created_at_idx on public.enquiries (created_at desc);

create table public.redirects (
  from_path text primary key check (from_path like '/%'),
  to_path text not null check (to_path like '/%'),
  created_at timestamptz not null default now(),
  check (from_path <> to_path)
);

create index redirects_to_path_idx on public.redirects (to_path);

-- ---------------------------------------------------------------------------
-- Role helpers (security definer so RLS on profiles doesn't recurse)
-- ---------------------------------------------------------------------------
create function private.is_owner() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where user_id = (select auth.uid()) and role = 'owner'
  );
$$;

create function private.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles where user_id = (select auth.uid())
  );
$$;

grant usage on schema private to authenticated, anon;
grant execute on function private.is_owner(), private.is_staff() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

-- New auth user -> staff profile. Promote to owner manually.
create function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email, 'Staff'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- updated_at + published_at / sold_at bookkeeping.
create function private.listings_before_write() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  if new.status in ('available','reserved','sold') and new.published_at is null then
    new.published_at := now();
  end if;
  if new.status = 'sold' and (tg_op = 'INSERT' or old.status is distinct from 'sold') then
    new.sold_at := coalesce(new.sold_at, now());
  end if;
  return new;
end;
$$;

create trigger listings_before_write
  before insert or update on public.listings
  for each row execute function private.listings_before_write();

-- Public URL of a listing.
create function private.listing_path(p_category_id uuid, p_slug text) returns text
language sql stable security definer set search_path = '' as $$
  select '/used-equipment/' || c.slug || '/' || p_slug
  from public.categories c where c.id = p_category_id;
$$;

create function private.category_path(p_category_id uuid) returns text
language sql stable security definer set search_path = '' as $$
  select '/used-equipment/' || c.slug from public.categories c where c.id = p_category_id;
$$;

-- Add a redirect and collapse chains: anything pointing at from_path now points at to_path.
create function private.add_redirect(p_from text, p_to text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if p_from is null or p_to is null or p_from = p_to then
    return;
  end if;
  update public.redirects set to_path = p_to where to_path = p_from;
  delete from public.redirects where from_path = to_path;
  -- If the target was itself redirected away earlier, it is live again.
  delete from public.redirects where from_path = p_to;
  insert into public.redirects (from_path, to_path) values (p_from, p_to)
  on conflict (from_path) do update set to_path = excluded.to_path, created_at = now();
end;
$$;

-- Listing URLs never die (CLAUDE.md §3.5):
--  * slug/category change -> 301 old URL to new URL
--  * archived             -> 301 to category page (removed again if un-archived)
--  * deleted              -> 301 to category page
create function private.listings_redirects() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  old_path text;
  new_path text;
begin
  if tg_op = 'DELETE' then
    -- Only listings that were ever public have URLs worth keeping.
    if old.published_at is not null then
      perform private.add_redirect(
        private.listing_path(old.category_id, old.slug),
        private.category_path(old.category_id));
    end if;
    return old;
  end if;

  old_path := private.listing_path(old.category_id, old.slug);
  new_path := private.listing_path(new.category_id, new.slug);

  if old_path is distinct from new_path and old.published_at is not null then
    perform private.add_redirect(old_path, new_path);
  end if;

  if new.status = 'archived' and old.status is distinct from 'archived' then
    perform private.add_redirect(new_path, private.category_path(new.category_id));
  elsif old.status = 'archived' and new.status is distinct from 'archived' then
    delete from public.redirects where from_path = new_path;
  end if;

  return new;
end;
$$;

create trigger listings_redirects_update
  after update of slug, category_id, status on public.listings
  for each row execute function private.listings_redirects();

create trigger listings_redirects_delete
  after delete on public.listings
  for each row execute function private.listings_redirects();

-- Public view counter (callable by anon; only touches public listings).
create function public.increment_listing_view(p_listing_id uuid) returns void
language sql security definer set search_path = '' as $$
  update public.listings
  set view_count = view_count + 1
  where id = p_listing_id and status in ('available','reserved','sold');
$$;

revoke all on function public.increment_listing_view(uuid) from public;
grant execute on function public.increment_listing_view(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles        enable row level security;
alter table public.categories      enable row level security;
alter table public.listings        enable row level security;
alter table public.listing_images  enable row level security;
alter table public.listing_private enable row level security;
alter table public.enquiries       enable row level security;
alter table public.redirects       enable row level security;

-- profiles
create policy "profiles: read own" on public.profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "profiles: owner all" on public.profiles
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));

-- categories
create policy "categories: public read" on public.categories
  for select to anon, authenticated using (true);
create policy "categories: owner write" on public.categories
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));

-- listings
create policy "listings: public read" on public.listings
  for select to anon, authenticated
  using (status in ('available','reserved','sold'));
create policy "listings: staff read own" on public.listings
  for select to authenticated
  using (created_by = (select auth.uid()) and (select private.is_staff()));
create policy "listings: staff insert" on public.listings
  for insert to authenticated
  with check (
    (select private.is_staff())
    and created_by = (select auth.uid())
    and status in ('draft','pending')
  );
create policy "listings: staff update own draft/pending" on public.listings
  for update to authenticated
  using (created_by = (select auth.uid()) and status in ('draft','pending') and (select private.is_staff()))
  with check (created_by = (select auth.uid()) and status in ('draft','pending'));
create policy "listings: owner all" on public.listings
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));

-- listing_images: public sees images of public listings only; staff manage
-- images on their own draft/pending listings; owner everything.
create policy "listing_images: public read" on public.listing_images
  for select to anon, authenticated
  using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.status in ('available','reserved','sold')
  ));
create policy "listing_images: staff read own" on public.listing_images
  for select to authenticated
  using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.created_by = (select auth.uid())
  ));
create policy "listing_images: staff write own" on public.listing_images
  for all to authenticated
  using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.created_by = (select auth.uid()) and l.status in ('draft','pending')
  ))
  with check (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.created_by = (select auth.uid()) and l.status in ('draft','pending')
  ));
create policy "listing_images: owner all" on public.listing_images
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));

-- listing_private: owner only.
create policy "listing_private: owner all" on public.listing_private
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));
revoke all on public.listing_private from anon;

-- enquiries: anyone can insert (only against public listings); owner reads.
create policy "enquiries: public insert" on public.enquiries
  for insert to anon, authenticated
  with check (
    listing_id is null or exists (
      select 1 from public.listings l
      where l.id = listing_id and l.status in ('available','reserved','sold')
    )
  );
create policy "enquiries: owner read" on public.enquiries
  for select to authenticated using ((select private.is_owner()));
create policy "enquiries: owner delete" on public.enquiries
  for delete to authenticated using ((select private.is_owner()));

-- redirects: public read (proxy looks them up), owner writes.
create policy "redirects: public read" on public.redirects
  for select to anon, authenticated using (true);
create policy "redirects: owner write" on public.redirects
  for all to authenticated using ((select private.is_owner())) with check ((select private.is_owner()));

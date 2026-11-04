# CLAUDE.md — Rayanco.com Rebuild

Read this file fully before writing any code. It defines the project, the constraints, and the build order.

## 1. Project overview

Rebuild **rayanco.com**, a live scrap-metal trading company site (Dammam / Jubail, Saudi Arabia, in business since 1995), on a modern stack, and add a **used-equipment marketplace**.

- Field staff visit sites, photograph used equipment for sale, and upload photos + details from their phone.
- Listings appear on the public site. Buyers browse and contact Rayanco on **WhatsApp or phone** to negotiate offline. There is **no online payment or checkout**.
- When an item is sold, staff mark it **Sold**. Sold listings are never hard-deleted (see SEO rules).

The current site is static HTML (7 pages) and is indexed by Google. **Preserving existing Google rankings is the top priority.**

## 2. Tech stack

- **Next.js** (latest stable, App Router, TypeScript, Tailwind CSS)
- **Supabase**: Postgres, Auth, Row Level Security
- **Cloudflare R2**: all images (S3-compatible API, presigned uploads)
- Hosting: Vercel (assume this unless told otherwise)
- Validation: zod. Forms: react-hook-form. Images: `browser-image-compression` + `heic2any` (browser), `sharp` (server fallback). All stored images are WebP (section 8a).

## 3. Non-negotiable SEO rules

1. **Canonical host is `https://www.rayanco.com`.** All non-www traffic gets a 301 to www (configured at the host level). Every page has `<link rel="canonical">` pointing to its own www URL.
2. **Every old URL must 301 to its new URL.** No old URL may ever return 404. Use `next.config.js` `redirects()` with `permanent: true`. Never chain redirects.
3. **Public pages must be server-rendered** (Server Components + ISR). Never client-render content that should rank.
4. **Keep the homepage's ranking content.** The title, H1 and core text below (section 6) must survive the redesign. They can be rewritten and improved, but not removed.
5. **Listing URLs never die.** Sold listings stay live with a Sold badge. Archived listings 301 to their category page. Deleting a listing row must also create a redirect (use the `redirects` table).
6. Every page gets a unique `<title>` and meta description, one `<h1>`, Open Graph tags, and JSON-LD.
7. `/admin` and `/api` are `noindex` and are disallowed in `robots.txt`.
8. Do not submit or switch anything to production. The site is developed on staging, with `noindex` there via an env flag `NEXT_PUBLIC_INDEXABLE=false`.

## 4. URL map & redirects

| Old URL | New URL |
| --- | --- |
| `/` | `/` |
| `/about.html` | `/about` |
| `/products.html` | `/products` |
| `/non_ferrous_metals.html` | `/products/non-ferrous-metals` |
| `/metal_scrap_surplus_materials.html` | `/products/metal-scrap-surplus` |
| `/equipment_resale.html` | `/used-equipment` |
| `/contact.html` | `/contact` |

Old image paths `/assets/images/**` must keep working. Copy the files to `/public/assets/images/` with the same paths, or rewrite those paths to R2.

New routes:

```
/                                   Home
/about
/products                           Product line overview
/products/non-ferrous-metals
/products/metal-scrap-surplus
/services/demolition                New (old menu item pointed to "#")
/used-equipment                     Marketplace index (filters + search)
/used-equipment/[category]          e.g. /used-equipment/cranes
/used-equipment/[category]/[slug]   Single listing
/sell-your-equipment                "Sell your used equipment / scrap to Rayanco"
/contact
/admin/**                           Staff/owner area (auth, noindex)
/sitemap.xml, /robots.txt           Generated dynamically
```

Phase 2: an Arabic mirror under `/ar/...` with `hreflang` (en, ar, x-default). Build the i18n structure (`name_en` / `name_ar` columns, a dictionary for UI strings) now, but ship English first.

## 5. Data model (Supabase)

```sql
create type listing_status as enum ('draft','pending','available','reserved','sold','archived');
create type user_role as enum ('owner','staff');

create table profiles (
  user_id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role user_role not null default 'staff',
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null, name_ar text,
  description_en text, description_ar text,
  seo_title text, seo_description text,
  sort int default 0
);

create table listings (
  id uuid primary key default gen_random_uuid(),
  ref_code text unique not null,            -- e.g. RY-0123, auto-generated
  slug text unique not null,                -- from title + year + ref
  category_id uuid references categories not null,
  title_en text not null, title_ar text,
  make text, model text, year int,
  condition text check (condition in ('working','needs_repair','for_scrap')),
  hours_or_km int, capacity text,           -- "50 ton", "500 kVA"
  location text,                            -- "Jubail", "Dammam"
  quantity int default 1,
  price_sar numeric, price_on_request boolean default false, negotiable boolean default true,
  description_en text, description_ar text,
  status listing_status not null default 'draft',
  view_count int default 0,
  created_by uuid references auth.users,
  published_at timestamptz, sold_at timestamptz,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings on delete cascade,
  r2_key text not null, width int, height int,
  alt_text text, sort_order int default 0
);

-- Private data is kept in a separate table so a public query can never leak it.
create table listing_private (
  listing_id uuid primary key references listings on delete cascade,
  seller_source text, cost_sar numeric, internal_notes text
);

create table enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings,
  name text, phone text, message text,
  channel text,                             -- 'form' | 'whatsapp_click' | 'call_click'
  created_at timestamptz default now()
);

create table redirects (
  from_path text primary key, to_path text not null, created_at timestamptz default now()
);
```

RLS policies:
- **Public (anon):** read `categories`, read `listing_images`, and read `listings` where `status in ('available','reserved','sold')`. Insert into `enquiries`.
- **Staff:** create listings, and update their own listings while `status in ('draft','pending')`. Upload images for their own listings.
- **Owner:** full access, including publishing, marking reserved/sold/archived, reading `listing_private`, and reading enquiries.
- `listing_private` has no access except owner.

Seed `categories` from the current equipment page: Asphalt Concrete Plant, Compressors, Concrete Pumps, Crane Barges, Cranes, Dozers, Generators, Hydraulic Excavators, Piling Rigs, Road Pavers, Road Rollers, Tower Cranes, Vibratory Compactors, Welding Machines, Wheel Loaders. Correct the old typos ("Hydrolic" → "Hydraulic").

## 6. Existing content to preserve (homepage)

- **Title:** `Scrap Buyer in Jubail, Saudi Arabia | Rayanco`
- **Meta description:** rewrite (fix the typo "arbia"), keeping the keywords *scrap buyer*, *Jubail*, *Saudi Arabia*, *buying and selling scrap*.
- **H1:** `Scrap Buyer in Jubail, Saudi Arabia`
- **Core text:** Rayanco is the largest scrap buyer in Jubail, Saudi Arabia. Bulk and container trade of ferrous and non-ferrous metal, local and international, since 1995. Trade ties with suppliers in the UK, USA, Canada, Denmark, Russia, Dubai, several African countries and India. Supplies 20+ steel-producing companies. Dismantling and scrapping of non-functional plants.
- **Services:** buying and selling of ferrous metals; non-ferrous metals (zorba, aluminium scrap); plastic scrap; metal scrap shredding.
- **Materials list:** copper, aluminium, brass, nickel, zinc, HMS, old scaffolding, pipes, plates, H/I beams, angles, C channels, electric poles, used rail plates, heavy machinery, transformers, generators, containers, used porta cabins, stainless steel (tube, coils, sheets, bars, billets), shredded scrap, rail wheels.
- **Certifications:** ISRI, ISO 9001, ISO 14001, Achilles, BMR. Logos are at `/assets/images/*.webp`.
- **Clients:** AGC, Al-Sale, Alkhorayf, Amiantit, Aramco, Astaldi, Daewoo, GS, SABIC, Saipem, SKEC, Technip, Técnicas Reunidas. Logos are at `/assets/images/*.webp`.
- Recent news to feature: Rayanco is building Saudi Arabia's first EAF steel billet plant in Dammam.

Products page (33 items) and non-ferrous page (11 items): reproduce the same item lists with the existing images. Give each item a short description so the page isn't only images.

**Contact / NAP:** keep these identical on every page footer.
- Rayanco, P.O. Box 72146, Dammam 31518, King Fahad Road, North opp. MMG, Al-Hammam Commercial Centre, 1st Floor, Office No. 9, Saudi Arabia
- sales@rayanco.com · +966 50 974 7741 · +966 50 386 1438
- WhatsApp number for listings: put it in env `NEXT_PUBLIC_WHATSAPP_NUMBER` (confirm with the owner).

## 7. Marketplace features

**Buyer side**
- `/used-equipment`: a responsive card grid. Filters for category, location, condition, price range and year, plus text search. Filters live in URL query params. Filtered pages are `noindex`; category pages are indexable.
- Card: cover photo, title, year, location, price (or "Price on request"), and a status badge (Available / Reserved / Sold).
- Listing page:
  - Photo gallery (swipe on mobile, lightbox), a spec table in real HTML, price, location, description.
  - **WhatsApp button** with the prefilled text `Hi, I'm interested in {title} (Ref {ref_code}) {url}`, plus a call button and a short enquiry form. Log each click in `enquiries`.
  - A "Similar equipment" block.
  - A share button.
- Sold listing: shows a Sold badge, hides the contact buttons, and shows "See similar equipment".

**Admin (mobile-first; staff use it on site from their phone)**
- Supabase Auth login (email + password or magic link).
- "New listing" form: take photos with the camera (`<input type="file" accept="image/*" capture="environment" multiple>`), auto-compress and convert to WebP (see section 8a), and upload directly to R2 via presigned PUT URLs from a route handler. Photos can be reordered, and one is chosen as the cover.
- Auto-save drafts. Staff submit → `pending`. The owner approves → `available`, which sets `published_at`.
- One-tap status changes: Reserved, Sold (sets `sold_at`), Archive.
- Dashboard: counts by status, recent enquiries, view counts.
- After any listing change, call `revalidatePath()` for the listing, its category, `/used-equipment` and the sitemap.

## 8. Images (Cloudflare R2)

- Bucket served via a custom domain, e.g. `media.rayanco.com`. Configure the `next/image` loader / `remotePatterns` for it.
- Key format: `listings/{listing_id}/{uuid}.webp`.
- Route handler `POST /api/upload-url`: authenticated, validates content type and size, returns a presigned PUT URL (`@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`).
- Env vars: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `NEXT_PUBLIC_MEDIA_URL`.
- Auto-generate alt text from the listing: `{year} {make} {model} {title} — {location}`.

### 8a. Automatic image compression + WebP conversion (required)

Every image uploaded anywhere in the admin (listings, categories, page content) is **automatically compressed and converted to WebP before it is stored**. Staff never resize anything by hand, and an original JPG/PNG/HEIC is never stored in R2.

Create one reusable utility, `lib/images/processImage.ts`, and one hook/component, `<ImageUploader>`, and use them for all uploads.

**Step 1 — in the browser (main path; keeps uploads fast on site mobile data)**
- Accept `image/jpeg`, `image/png`, `image/webp` and `image/heic`/`image/heif` (iPhone camera). Reject anything else with a clear message. Max input 25 MB per file.
- HEIC/HEIF: convert to JPEG first with `heic2any`, loaded with a dynamic `import()` only when needed.
- Fix orientation from EXIF so photos aren't sideways; `browser-image-compression` handles this. Then **strip all EXIF metadata**, which removes GPS location of the site and phone details.
- Using `browser-image-compression` (`useWebWorker: true`, `fileType: 'image/webp'`), produce **two WebP versions** from each photo:
  - `large`: max 1600 px on the long edge, quality ~0.8, target ≤ 300 KB
  - `thumb`: max 480 px on the long edge, quality ~0.75, target ≤ 60 KB
- Read the final width/height of each version (`createImageBitmap`) so they can be saved in `listing_images`.
- Show a per-photo progress state: "Compressing → Uploading → Done", plus the before/after size (e.g. "6.2 MB → 280 KB"). Process files one or two at a time so low-end phones don't run out of memory.
- Fallback: if the browser can't encode WebP (very old Safari), `canvas.toBlob(..., 'image/webp')` returns PNG. Detect this and send the JPEG version flagged `needs_server_conversion: true` instead (see step 3).

**Step 2 — upload**
- `POST /api/upload-url` returns two presigned PUT URLs, one per version:
  - `listings/{listing_id}/{uuid}.webp`
  - `listings/{listing_id}/{uuid}_thumb.webp`
- The server only signs uploads with `Content-Type: image/webp` and a content-length cap of 1 MB. Anything else is refused.
- Upload directly from the browser to R2. Images never pass through Vercel functions, which avoids the 4.5 MB body limit.
- After both PUTs succeed, insert the `listing_images` row: `r2_key`, `thumb_key`, width, height, `bytes`, `sort_order`.

**Step 3 — server safety net (route handler with `sharp`, Node runtime)**
- `POST /api/images/verify`: fetches the uploaded object from R2 and checks with `sharp` that it really is WebP within size limits.
- If it isn't WebP, or was flagged `needs_server_conversion`, it converts it: `sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 })`. It writes both sizes back to R2, deletes the original, and updates the row.
- Uploads for that flow go to `incoming/{uuid}`. A daily Supabase cron (or R2 lifecycle rule) deletes anything in `incoming/` older than 24 h.

**Schema additions**
```sql
alter table listing_images
  add column thumb_key text,
  add column bytes int,
  add column format text default 'webp';
```

**Display**
- Grids and cards use `thumb`; the listing page and gallery use `large`. Always set `width`/`height` so the layout doesn't shift.
- OG/WhatsApp share image: the `large` cover photo (WebP works in WhatsApp previews).
- Optional watermark: a small Rayanco logo drawn on the canvas before encoding, controlled by a setting.

**Existing site images:** the 70+ images in `/assets/images/**` are already `.webp`. Keep them at the same paths (SEO). When copying them to R2, re-run them through `sharp` only to add a thumbnail; do not rename the originals.

**Acceptance test:** upload a 6–8 MB iPhone HEIC photo and a 5 MB PNG from a phone. Both must end up in R2 as `.webp` (large ≤ 300 KB plus thumb), with no EXIF GPS data, correct orientation and correct dimensions in the DB, and display sharp on the listing page.

## 9. SEO implementation details

- `generateMetadata` on every route. Listing title pattern: `Used {title} for Sale in {location}{year ? ' — ' + year : ''} | Rayanco`.
- JSON-LD:
  - `Organization` + `LocalBusiness` on the home page (NAP as above).
  - `Product` + `Offer` (priceCurrency SAR; availability InStock or SoldOut) on listings.
  - `BreadcrumbList` on all inner pages.
- `app/sitemap.ts` pulls all public listings and categories from Supabase, with `lastModified`.
- `app/robots.ts`: disallow `/admin` and `/api`; output a full `noindex` when `NEXT_PUBLIC_INDEXABLE !== 'true'`.
- Middleware: look up `redirects` table entries (cached) for deleted or renamed listing slugs.
- Performance: LCP under 2.5s on mobile, `next/image` everywhere, no layout shift in galleries, fonts via `next/font`.

## 10. Design direction

- An industrial, trustworthy B2B look; not flashy. Dark steel/charcoal plus one strong accent colour (to be confirmed with the client); generous whitespace; big real photos.
- Mobile-first: most Saudi buyers will open links from WhatsApp on a phone.
- Header: logo, nav (Home, About, Products, Used Equipment, Services, Contact), a WhatsApp CTA, and an EN/AR toggle placeholder.
- The home page leads with two clear paths: **"Sell us your scrap"** and **"Browse used equipment"**.
- Layout must be RTL-ready (use logical CSS properties: `ms-`/`me-`, `ps-`/`pe-`) for the Arabic phase.

## 11. Build order

1. Project setup, Tailwind, env, Supabase client (server + browser), schema migration + RLS + seed categories.
2. Layout, header/footer, design system components.
3. Static pages with preserved content: Home, About, Products, Non-ferrous, Metal scrap, Demolition, Contact, Sell your equipment.
4. Redirects in `next.config.js`, canonical / metadata / JSON-LD helpers, sitemap, robots.
5. Marketplace public pages: index, category, listing.
6. Admin: auth, listing form with R2 upload, approval, status changes, enquiries.
7. QA: test every old URL (expect 301 → 200); run Lighthouse on mobile; check that no private field appears in any public response.

## 12. Working rules for Claude

- Do not change the URL structure or redirect map without asking.
- Do not remove homepage ranking content (section 6) without asking.
- Never expose `listing_private` or service-role keys to the client. Use the service role only in server code.
- Keep components small and typed. Run `npm run build` and fix all errors before saying a step is done.
- When unsure about business details (WhatsApp number, prices, colours), leave a clear `TODO(owner):` comment instead of inventing them.

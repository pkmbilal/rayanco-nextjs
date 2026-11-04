/**
 * Database types for supabase/migrations/20261104000001_init.sql.
 * Hand-written until the migration is applied; then replace with:
 *   npx supabase gen types typescript --project-id <ref> > lib/supabase/types.ts
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ListingStatus = "draft" | "pending" | "available" | "reserved" | "sold" | "archived";
export type UserRole = "owner" | "staff";
export type ListingCondition = "working" | "needs_repair" | "for_scrap";
export type EnquiryChannel = "form" | "whatsapp_click" | "call_click";

type Table<Row, Required extends keyof Row> = {
  Row: Row;
  Insert: Pick<Row, Required> & Partial<Omit<Row, Required>>;
  Update: Partial<Row>;
  Relationships: {
    foreignKeyName: string;
    columns: string[];
    isOneToOne?: boolean;
    referencedRelation: string;
    referencedColumns: string[];
  }[];
};

export type Profile = {
  user_id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
};

export type Category = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort: number;
};

export type Listing = {
  id: string;
  ref_code: string;
  slug: string;
  category_id: string;
  title_en: string;
  title_ar: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  condition: ListingCondition | null;
  hours_or_km: number | null;
  capacity: string | null;
  location: string | null;
  quantity: number;
  price_sar: number | null;
  price_on_request: boolean;
  negotiable: boolean;
  description_en: string | null;
  description_ar: string | null;
  status: ListingStatus;
  view_count: number;
  created_by: string | null;
  published_at: string | null;
  sold_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ListingImage = {
  id: string;
  listing_id: string;
  r2_key: string;
  thumb_key: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  format: string;
  alt_text: string | null;
  sort_order: number;
};

export type ListingPrivate = {
  listing_id: string;
  seller_source: string | null;
  cost_sar: number | null;
  internal_notes: string | null;
};

export type Enquiry = {
  id: string;
  listing_id: string | null;
  name: string | null;
  phone: string | null;
  message: string | null;
  channel: EnquiryChannel;
  created_at: string;
};

export type Redirect = {
  from_path: string;
  to_path: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile, "user_id" | "full_name">;
      categories: Table<Category, "slug" | "name_en">;
      listings: Table<Listing, "slug" | "category_id" | "title_en">;
      listing_images: Table<ListingImage, "listing_id" | "r2_key">;
      listing_private: Table<ListingPrivate, "listing_id">;
      enquiries: Table<Enquiry, "channel">;
      redirects: Table<Redirect, "from_path" | "to_path">;
    };
    Views: { [_ in never]: never };
    Functions: {
      increment_listing_view: { Args: { p_listing_id: string }; Returns: undefined };
    };
    Enums: {
      listing_status: ListingStatus;
      user_role: UserRole;
    };
    CompositeTypes: { [_ in never]: never };
  };
};

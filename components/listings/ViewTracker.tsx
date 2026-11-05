"use client";

import { useEffect } from "react";
import { recordListingView } from "@/app/actions/listing";

/** Counts one view per listing per browser session, so the page itself stays fully cached. */
export function ViewTracker({ listingId }: { listingId: string }) {
  useEffect(() => {
    const key = `viewed:${listingId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // storage blocked: still count once per page load
    }
    void recordListingView(listingId).catch(() => {});
  }, [listingId]);
  return null;
}

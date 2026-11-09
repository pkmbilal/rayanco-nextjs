"use client";

import { useState } from "react";
import { logListingClick } from "@/app/actions/listing";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  listingId: string;
  whatsappHref: string;
  phone: { tel: string; display: string };
  shareUrl: string;
  shareTitle: string;
};

/** WhatsApp / call / share buttons. Clicks are logged as enquiries without blocking navigation. */
export function ListingContact({ locale, listingId, whatsappHref, phone, shareUrl, shareTitle }: Props) {
  const t = getDictionary(locale).listings;
  const [copied, setCopied] = useState(false);

  const log = (channel: "whatsapp_click" | "call_click") => {
    void logListingClick(listingId, channel).catch(() => {});
  };

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch {
        // dismissed
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked; nothing else to do
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => log("whatsapp_click")}
        className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
      >
        <WhatsAppIcon className="size-5" />
        {t.whatsapp}
      </a>
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${phone.tel}`}
          onClick={() => log("call_click")}
          className={buttonClasses({ variant: "secondary", size: "md", className: "w-full text-steel-900" })}
        >
          <PhoneIcon className="size-4 text-accent-500" />
          {t.call}
        </a>
        <button
          type="button"
          onClick={share}
          className={buttonClasses({ variant: "secondary", size: "md", className: "w-full text-steel-900" })}
        >
          {copied ? t.copied : t.share}
        </button>
      </div>
      <p className="text-center text-xs text-steel-500" dir="ltr">
        {phone.display}
      </p>
    </div>
  );
}

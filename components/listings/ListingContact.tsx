"use client";

import { useState } from "react";
import { logListingClick } from "@/app/actions/listing";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";

type Props = {
  listingId: string;
  whatsappHref: string;
  phone: { tel: string; display: string };
  shareUrl: string;
  shareTitle: string;
};

/** WhatsApp / call / share buttons. Clicks are logged as enquiries without blocking navigation. */
export function ListingContact({ listingId, whatsappHref, phone, shareUrl, shareTitle }: Props) {
  const t = getDictionary().listings;
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
    <div className="flex flex-col gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => log("whatsapp_click")}
        className={buttonClasses({ variant: "whatsapp", size: "lg", className: "w-full" })}
      >
        <WhatsAppIcon className="size-5" />
        {t.whatsapp}
      </a>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${phone.tel}`}
          onClick={() => log("call_click")}
          className={buttonClasses({ variant: "secondary", size: "md", className: "w-full text-steel-900" })}
        >
          <PhoneIcon className="size-5" />
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
      <p className="text-center text-sm text-steel-500" dir="ltr">
        {phone.display}
      </p>
    </div>
  );
}

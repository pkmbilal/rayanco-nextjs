"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitListingEnquiry } from "@/app/actions/listing";
import { Button } from "@/components/ui/Button";
import { listingEnquirySchema, type ListingEnquiryInput } from "@/lib/enquiry";
import { getDictionary, type Locale } from "@/lib/i18n";

const inputClass =
  "mt-1 block w-full rounded-full border-[1.5px] border-steel-100 bg-steel-50 px-4 py-2.5 text-base text-steel-900 placeholder:text-steel-400 focus:border-accent-500 focus:bg-white focus:outline-none sm:text-sm [&:is(textarea)]:resize-none [&:is(textarea)]:rounded-2xl";

export function ListingEnquiryForm({
  locale,
  listingId,
  defaultMessage,
}: {
  locale: Locale;
  listingId: string;
  defaultMessage: string;
}) {
  const t = getDictionary(locale).form;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const defaults = { listingId, website: "", message: defaultMessage };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ListingEnquiryInput>({ resolver: zodResolver(listingEnquirySchema), defaultValues: defaults });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    const res = await submitListingEnquiry(values);
    if (res.ok) {
      reset(defaults);
      setStatus("success");
    } else {
      setStatus("error");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <input type="hidden" {...register("listingId")} />
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-steel-700">
          {t.name} *
          <input className={inputClass} autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name ? <p className="mt-1 text-sm text-red-700">{t.required}</p> : null}
        </label>
        <label className="block text-sm font-medium text-steel-700">
          {t.phone} *
          <input
            className={inputClass}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone ? <p className="mt-1 text-sm text-red-700">{t.invalidPhone}</p> : null}
        </label>
      </div>
      <label className="block text-sm font-medium text-steel-700">
        {t.message}
        <textarea className={inputClass} rows={3} {...register("message")} />
      </label>
      <Button type="submit" variant="dark" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t.sending : t.submit}
      </Button>
      <p role="status" aria-live="polite" className="text-sm">
        {status === "success" ? <span className="text-success">{t.success}</span> : null}
        {status === "error" ? <span className="text-red-700">{t.error}</span> : null}
      </p>
    </form>
  );
}

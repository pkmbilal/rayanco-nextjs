"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { submitEnquiry } from "@/app/actions/enquiry";
import { Button } from "@/components/ui/Button";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { getDictionary } from "@/lib/i18n";

type Kind = EnquiryInput["kind"];

const inputClass =
  "mt-1 block w-full rounded-full border-[1.5px] border-steel-100 bg-steel-50 px-4 py-2.5 text-base text-steel-900 placeholder:text-steel-400 focus:border-accent-500 focus:bg-white focus:outline-none sm:text-sm [&:is(textarea)]:resize-none [&:is(textarea)]:rounded-2xl";

export function EnquiryForm({ kind }: { kind: Kind }) {
  const t = getDictionary().form;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { kind, website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    const res = await submitEnquiry(values);
    if (res.ok) {
      reset({ kind, website: "" });
      setStatus("success");
    } else {
      setStatus("error");
    }
  });

  const errorText = (e?: FieldError, fallback: string = t.required) => (e ? <p className="mt-1 text-sm text-red-700">{fallback}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <input type="hidden" {...register("kind")} />
      {/* Honeypot, hidden from people and assistive tech. */}
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
          {errorText(errors.name)}
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
          {errorText(errors.phone, t.invalidPhone)}
        </label>
        <label className="block text-sm font-medium text-steel-700">
          {t.email}
          <input className={inputClass} type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          {errorText(errors.email, t.invalidEmail)}
        </label>
        {kind === "sell" ? (
          <label className="block text-sm font-medium text-steel-700">
            {t.location}
            <input className={inputClass} {...register("location")} />
          </label>
        ) : (
          <label className="block text-sm font-medium text-steel-700">
            {t.company}
            <input className={inputClass} autoComplete="organization" {...register("company")} />
          </label>
        )}
      </div>

      {kind === "sell" ? (
        <label className="block text-sm font-medium text-steel-700">
          {t.items}
          <textarea
            className={inputClass}
            rows={3}
            placeholder="e.g. 2 × 50-ton crawler cranes, 200 t HMS scrap, used generators"
            {...register("items")}
          />
        </label>
      ) : null}

      <label className="block text-sm font-medium text-steel-700">
        {t.message}
        <textarea className={inputClass} rows={4} {...register("message")} />
      </label>

      <Button type="submit" variant="dark" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:px-10">
        {isSubmitting ? t.sending : t.submit}
      </Button>

      <p role="status" aria-live="polite" className="text-sm">
        {status === "success" ? <span className="text-success">{t.success}</span> : null}
        {status === "error" ? <span className="text-red-700">{t.error}</span> : null}
      </p>
    </form>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { getDictionary } from "@/lib/i18n";

export type GalleryImage = { src: string; thumb: string; width: number; height: number; alt: string };

/**
 * Listing photos: swipeable scroll-snap track (mobile), thumbnail strip, and a native
 * <dialog> lightbox. Every image has fixed dimensions/aspect so nothing shifts on load.
 */
export function ListingGallery({ images, overlay }: { images: GalleryImage[]; overlay?: ReactNode }) {
  const t = getDictionary().listings;
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded-xl bg-steel-100">
        {overlay}
      </div>
    );
  }

  function scrollTo(i: number) {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    // Math.abs: scrollLeft is negative in RTL.
    const i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    if (i !== index) setIndex(i);
  }

  function openLightbox(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    const next = (index + delta + images.length) % images.length;
    setIndex(next);
    scrollTo(next);
  }

  const current = images[index] ?? images[0];

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-xl bg-steel-100 shadow-[0_6px_18px_rgb(11_34_54/0.12)] [scrollbar-width:none]"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => openLightbox(i)}
              className="relative aspect-[4/3] w-full shrink-0 snap-center cursor-zoom-in"
              aria-label={`${t.photo(i + 1, images.length)}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                preload={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain"
              />
            </button>
          ))}
        </div>
        {overlay}
        {images.length > 1 ? (
          <p className="absolute bottom-3 end-3 rounded-full bg-steel-950/75 px-2.5 py-1 text-xs font-semibold text-white">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="mt-2.5 grid auto-cols-[calc((100%-1.875rem)/4)] grid-flow-col gap-2.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {images.map((img, i) => (
            <li key={img.thumb}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  scrollTo(i);
                }}
                aria-label={t.photo(i + 1, images.length)}
                aria-current={i === index}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 ${i === index ? "border-accent-500" : "border-transparent opacity-75 hover:opacity-100"}`}
              >
                <Image src={img.thumb} alt="" fill sizes="160px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <dialog
        ref={dialogRef}
        className="m-auto h-full max-h-none w-full max-w-none bg-steel-950/95 p-0 backdrop:bg-steel-950/80"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center p-4">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute end-4 top-4 rounded bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            {t.close} ✕
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t.previous}
                className="absolute start-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-2xl text-white hover:bg-white/20"
              >
                <span className="inline-block rtl:rotate-180">‹</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t.next}
                className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-2xl text-white hover:bg-white/20"
              >
                <span className="inline-block rtl:rotate-180">›</span>
              </button>
              <p className="absolute bottom-4 start-1/2 -translate-x-1/2 text-sm text-white/80">
                {index + 1} / {images.length}
              </p>
            </>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}

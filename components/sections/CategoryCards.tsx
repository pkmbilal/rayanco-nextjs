import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";

export type CategoryCard = {
  href: string;
  title: string;
  text: string;
  /** Small label, e.g. "11 metals". */
  meta: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
};

/** Large image cards for the main product categories; overlaps the hero above it (use `PageHero overlap`). */
export function CategoryCards({ cards }: { cards: CategoryCard[] }) {
  return (
    <Container className="relative z-10 -mt-8 sm:-mt-10">
      <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group relative isolate flex min-h-28 flex-col justify-end overflow-hidden rounded-lg bg-steel-950 px-5 py-4 sm:py-5 text-white shadow-float ring-1 ring-white/10 sm:min-h-52"
            >
              <Image
                src={c.image}
                alt=""
                width={c.imageWidth}
                height={c.imageHeight}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="absolute inset-0 -z-20 size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(13_30_40/0.15)_0%,rgb(13_30_40/0.55)_45%,rgb(13_30_40/0.95)_100%)]"
              />
              <span className="font-ui text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-400">{c.meta}</span>
              <span className="mt-1 flex items-center justify-between gap-3 font-display text-xl font-bold leading-tight">
                {c.title}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-500 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <ArrowIcon className="size-3.5" />
                </span>
              </span>
              <span className="mt-1.5 hidden text-sm leading-snug text-white/75 sm:block">{c.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

import Image from "next/image";

type Logo = { name: string; src: string };

const columns = {
  5: "grid-cols-3 sm:grid-cols-5",
  7: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-7",
} as const;

/** Certification or client logos on white tiles. */
export function LogoGrid({
  logos,
  width,
  height,
  altSuffix = "",
  cols = 7,
  tiles = true,
}: {
  logos: readonly Logo[];
  width: number;
  height: number;
  altSuffix?: string;
  cols?: keyof typeof columns;
  /** Bordered white tiles (clients) vs. bare logos (certifications band). */
  tiles?: boolean;
}) {
  return (
    <ul className={`grid gap-2.5 sm:gap-3 ${columns[cols]}`}>
      {logos.map((logo) => (
        <li
          key={logo.src}
          className={`flex h-16 items-center justify-center ${tiles ? "rounded-md border border-steel-100 bg-white p-2.5" : ""}`}
        >
          <Image
            src={logo.src}
            alt={`${logo.name}${altSuffix}`}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 140px, 30vw"
            className="h-auto max-h-full w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

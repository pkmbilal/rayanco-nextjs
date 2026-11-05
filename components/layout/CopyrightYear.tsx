import { cacheLife } from "next/cache";

/** Current year, cached so prerendering stays static (Cache Components). Refreshes daily. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

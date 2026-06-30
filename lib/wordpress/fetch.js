import { DEFAULT_SITE, WORDPRESS_SITES } from "./";

export async function wpFetch(
  endpoint,
  { site = DEFAULT_SITE, ...options } = {}
) {
  const config = WORDPRESS_SITES[site];
  if (!config) throw new Error(`Unknown site: ${site}`);
  const url = config.api === "wpcom"
    ? `https://public-api.wordpress.com/rest/v1.1/sites/${config.url}/${endpoint}`
    : `https://${config.url}/wp-json/${endpoint}`;
  const response = await fetch(url, { ...options, cache: "no-store" });
  if (!response.ok) throw new Error(`WordPress request failed (${response.status})`);
  return response.json();
}

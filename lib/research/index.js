import { WORDPRESS_SITES } from "@/lib/wordpress";

export const RESEARCH_ORGANIZATIONS = Object.entries(WORDPRESS_SITES).map(
  ([value, site]) => ({
    value,
    label: site.label ?? value.toUpperCase()
  })
);

export function getResearchState() {
  return JSON.parse(
    sessionStorage.getItem("research")
      ?? '{"query":"","year":"2006","organizations":[],"results":[]}'
  );
}

export function setResearchState(data) {
  sessionStorage.setItem("research", JSON.stringify(data));
}

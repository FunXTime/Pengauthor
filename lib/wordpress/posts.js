import * as rest from "./rest/posts";
import * as wpcom from "./wpcom/posts";
import { WORDPRESS_SITES } from "./";

function getImplementation(site) {
  const config = WORDPRESS_SITES[site];
  if (!config) throw new Error(`Unknown site "${site}"`);
  return config.api === "wpcom"
    ? wpcom
    : rest;
}

export async function searchPosts(
  site,
  query,
  options = {}
) {
  const api = getImplementation(site);
  const posts = await api.searchPosts(site, query, options);
  return posts.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function getPost(site, id) {
  return getImplementation(site).getPost(site, id);
}

export async function getRecentPosts(
  site,
  { page = 1, perPage = 20 } = {}
) {
  const api = getImplementation(site);
  const posts = await api.getRecentPosts(site, { page, perPage });

  return posts.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

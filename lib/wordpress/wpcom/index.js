import { WORDPRESS_SITES } from "../";
import { wpFetch } from "../fetch";

function stripHtml(text = "") {
  if (!text) return "";
  const stripped = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = stripped;
    return textarea.value;
  }
  return stripped
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function normalizePost(post) {
  return {
    title: stripHtml(
      post.title
      ?? ""
    ),
    description: stripHtml(
      post.excerpt ??
      post.content ??
      ""
    ),
    url:
      post.URL
      ?? "",
    thumbnail:
      post.featured_image
      ?? null,
    author:
      post.author?.name
      ?? "",
    timestamp:
      post.date
      ?? ""
  };
}

export async function searchPosts(
  site,
  query,
  options = {}
) {
  const { filterTopTen = true, ...searchOptions } = options;
  const params = new URLSearchParams({
    search: query, number: 50, ...searchOptions
  });
  const response = await wpFetch(`posts?${params}`, { site });
  let posts = response.posts ?? [];
  if (filterTopTen) {
    const topTenCategory = WORDPRESS_SITES[site].topTenCategory;
    posts = posts.filter(
      (post) => !post.categories?.[topTenCategory]
    );
  }
  return posts.map(normalizePost);
}

export async function getPost(site, id) {
  const post = await wpFetch(`posts/${id}`, { site });
  return normalizePost(post);
}

export async function getRecentPosts(
  site,
  { page = 1, perPage = 20 } = {}
) {
  const response = await wpFetch(`posts?page=${page}&number=${perPage}`, { site });
  return (response.posts ?? [])
    .map(normalizePost);
}

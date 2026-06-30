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
      post.title?.rendered
      ?? ""
    ),
    description: stripHtml(
      post.excerpt?.rendered
      ?? post.content?.rendered
      ?? ""
    ),
    url:
      post.link
      ?? "",
    thumbnail:
      post.jetpack_featured_media_url
      ?? post.yoast_head_json?.schema?.["@graph"]?.find((item) => item.thumbnailUrl)?.thumbnailUrl
      ?? null,
    author:
      post.yoast_head_json?.author
      ?? "",
    timestamp:
      post.date
      ?? post.date_gmt
      ?? ""
  };
}

export async function searchPosts(
  site,
  query,
  options = {}
) {
  const params = new URLSearchParams({ search: query, per_page: 50, ...options });
  const results = await wpFetch(`wp/v2/search?${params}`, { site });
  const posts = await Promise.all(
    results
      .filter((result) => result.subtype === "post")
      .map((result) => wpFetch(`wp/v2/posts/${result.id}`, { site }))
  );
  return posts.map(normalizePost);
}

export async function getPost(
  site,
  id
) {
  const post = await wpFetch(`wp/v2/posts/${id}`, { site });
  return normalizePost(post);
}

export async function getRecentPosts(
  site,
  { page = 1, perPage = 20 } = {}
) {
  const posts = await wpFetch(`wp/v2/posts?page=${page}&per_page=${perPage}`, { site });
  return posts.map(normalizePost);
}

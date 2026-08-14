import { THUMBNAILS, THUMBNAIL_MAPPINGS } from "@/config";

export function getThumbnail(formData, palette) {
  const thumbnails = THUMBNAILS[palette] ?? [];
  const thumbnailName = formData.postCategory === "News" && formData.isBreakingNews
    ? "Breaking News"
    : THUMBNAIL_MAPPINGS[formData.postType];
  const thumbnail = thumbnails.find(
    (thumbnail) => thumbnail.for === thumbnailName
  );
  if (!thumbnail) return getFallbackThumbnail(palette);
  return {
    ...thumbnail,
    previewSrc: getThumbnailPreview(formData, palette)
  };
}

export function getThumbnailPreview(formData, palette) {
  const postCategory = formData.postCategory;
  const thumbnailName = postCategory === "News" && formData.isBreakingNews
    ? "Breaking News"
    : THUMBNAIL_MAPPINGS[formData.postType];

  return `/thumbnails/preview/${postCategory}/${thumbnailName}/${thumbnailName}${
    palette === "DEFAULT"
      ? ""
      : ` ${palette}`
  }.png`;
}

function getFallbackThumbnail(palette) {
  return {
    filename: "fallback.png",
    src: `/thumbnails/fallback/${palette}.png`,
    previewSrc: `/thumbnails/fallback/${palette}.png`,
    designer: "Unknown",
    fallback: true
  };
}

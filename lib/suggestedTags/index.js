import { SUGGESTED_TAGS, GLOBAL_TAGS } from "@/config";

export default function getSuggestedTags(postType, hasInterview = false) {
  const postTags = SUGGESTED_TAGS[postType] ?? SUGGESTED_TAGS.default;
  const globalTags = GLOBAL_TAGS.map((name) => ({ name }));
  const allTags = [...globalTags, ...postTags];

  if (
    hasInterview &&
    !allTags.some((tag) => tag.isInterviewee === true)
  ) allTags.push(...SUGGESTED_TAGS.interviewee);

  return allTags
    .filter(
      (tag, index, array) =>
        array.findIndex(
          (item) => item.name === tag.name
        ) === index
    )
    .map((tag) => ({
      ...tag,
      isGlobal: GLOBAL_TAGS.includes(tag.name),
      isItalic: tag.name.startsWith("[") && tag.name.endsWith("]")
    }));
}

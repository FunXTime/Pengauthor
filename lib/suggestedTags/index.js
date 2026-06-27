import tags from "./tags.json";
import { GLOBAL_TAGS } from "@/app/config";

export default function getSuggestedTags(
  postType,
  hasInterview = false
) {
  const postTags =
    tags[postType] ??
    tags.default ??
    [];
  const globalTags = GLOBAL_TAGS.map((name) => ({ name }));
  const allTags = [
    ...globalTags,
    ...postTags
  ];

  if (hasInterview) allTags.push(tags.interviewee[0]);

  return allTags
    .filter(
      (tag, index, array) =>
        array.findIndex(
          (item) => item.name === tag.name
        ) === index
    )
    .map((tag) => ({
      ...tag,
      isGlobal:
        GLOBAL_TAGS.includes(tag.name),
      isItalic:
        tag.name.startsWith("[") &&
        tag.name.endsWith("]")
    }));
}

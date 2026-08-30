import defaultTemplate from "@/config/boilerplates/default.json";

export default async function getTemplate(
  postType
) {
  try {
    const template = await import(`@/config/boilerplates/${postType}.json`);
    return template.default;
  } catch {
    return defaultTemplate;
  }
}

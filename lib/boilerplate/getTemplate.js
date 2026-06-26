import defaultTemplate from "./templates/default.json";

export default async function getTemplate(
  postType
) {
  try {
    const template = await import(`./templates/${postType}.json`);
    return template.default;
  } catch {
    return defaultTemplate;
  }
}
import * as renderers from "./elements";

function renderElement(
  element,
  context
) {
  const renderer = renderers[element.type];
  if (!renderer) return "";

  if (
    element.type === "interview" &&
    !context.hasInterview
  ) return "";

  if (
    element.type === "image" &&
    element.src === "thumbnail" &&
    context.thumbnail
  ) element = {
      ...element,
      attachmentId: context.thumbnail.attachmentId,
      src: context.thumbnail.src,
      caption: context.thumbnail.designer,
      height: context.thumbnail.height
  };

  if (
    element.type === "interview" &&
    element.questions ===
      "generatedQuestions" &&
      Array.isArray(context.interviewQuestions)
  ) element = {
      ...element,
      questions: context.interviewQuestions.map((question) => ({ question }))
  };

  return renderer(element, context);
}

export default function compile(
  template,
  context
) {
  if (!context.reporterName) context.reporterName = "Reporter";
  return template
    .map((element) => renderElement(element, context))
    .join("\n");
}

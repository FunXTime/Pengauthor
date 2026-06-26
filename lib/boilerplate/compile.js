import * as renderers from "./elements";

function renderElement(
  element,
  context
) {
  if (
    element.type === "interview" &&
    !context.hasInterview
  ) return "";

  const renderer = renderers[element.type];
  if (!renderer) return "";

  let resolvedElement = element;

  if (
    element.source === "thumbnail" &&
    context.thumbnail
  ) resolvedElement = {
      ...element,
      attachmentId: context.thumbnail.attachmentId,
      src: context.thumbnail.src,
      caption:
        context.thumbnail.designer === "Unknown"
          ? ""
          : `Designed by ${context.thumbnail.designer}`,
      height: context.thumbnail.height ?? ""
  };

  if (
    element.questions ===
      "generatedQuestions" &&
      Array.isArray(context.interviewQuestions)
  ) resolvedElement = {
      ...resolvedElement,
      questions:
        context.interviewQuestions.map((question) => ({ question }))
  };

  return renderer(
    resolvedElement,
    context
  );
}

export default function compile(
  template,
  context
) {
  return template
    .map((element) => renderElement(element, context))
    .join("\n");
}
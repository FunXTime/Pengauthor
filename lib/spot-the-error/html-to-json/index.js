import { JSDOM } from "jsdom";

export function htmlToJson(html) {
  const dom = new JSDOM(
    `<body>${html}</body>`
  );
  const body = dom.window.document.body;
  const elements = [];
  let interviewQuestions = null;
  function finishInterview() {
    if (!interviewQuestions) return;
    elements.push({
      type: "interview",
      questions: interviewQuestions
    });
    interviewQuestions = null;
  }

  for (const node of body.childNodes) {
    if (node.nodeType === 8) {
      if (node.data.trim() === "more") {
        finishInterview();
        elements.push({ type: "readMore" });
      }
      continue;
    }
    if (node.nodeType !== 1) continue;
    const element = parseElement(node);
    if (!element) continue;
    if (
      element._interview &&
      element._interviewType === "question"
    ) {
      if (!interviewQuestions) interviewQuestions = [];
      interviewQuestions.push({
        question: element.content,
        answer: "Answer"
      });
      continue;
    }
    if (element._interview && element._interviewType === "answer") {
      if (interviewQuestions && interviewQuestions.length) {
        interviewQuestions[
          interviewQuestions.length - 1
        ].answer = element.content;
      }
      continue;
    }
    finishInterview();
    elements.push(element);
  }
  finishInterview();
  return elements;
}

function parseElement(node) {
  const tag = node.tagName.toLowerCase();
  if (tag === "p" && isThumbnailParagraph(node)) return {
    type: "image",
    src: "thumbnail"
  };
  switch (tag) {
    case "p":
      if (
        node.children.length === 1 &&
        node.children[0].tagName.toLowerCase() === "img"
      ) return parseImage(node.children[0]);
      return parseParagraph(node);
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return parseHeading(node);
    case "blockquote":
      return parseBlockquote(node);
    case "img":
      return parseImage(node);
    case "ul":
    case "ol":
      return parseList(node);
    case "hr":
      return { type: "horizontalRule" };
    default:
      return null;
  }
}

function isThumbnailParagraph(node) {
  if (node.children.length !== 1) return false;
  const image = node.children[0];
  if (image.tagName.toLowerCase() !== "img") return false;
  return (
    image.getAttribute("data-thumbnail") === "true"
  );
}

function parseParagraph(node) {
  const plainText = node.textContent.trim();
  const imageMatch = plainText.match(
    /^\[Image\s+—\s*(.+?)\]$/
  );
  if (imageMatch) return {
    type: "image",
    helperText: imageMatch[1]
  };
  const settings = parseSettings(
    node.getAttribute("data-settings")
  );
  const textAlign = node.style.textAlign?.trim();
  if (textAlign) settings.align = textAlign;
  const interview = node.getAttribute("data-interview");
  const content = node.innerHTML.trim();
  if (interview === "question") return {
    _interview: true,
    _interviewType: "question",
    content
  };
  if (interview === "answer") return {
    _interview: true,
    _interviewType: "answer",
    content
  };
  const element = {
    type: "paragraph",
    content
  };
  if (Object.keys(settings).length > 0) element.settings = settings;
  return element;
}

function parseHeading(node) {
  const level = Number(
    node.tagName.substring(1)
  ) || 3;
  const settings = parseSettings(
    node.getAttribute("data-settings")
  );
  const interview = node.getAttribute("data-interview");
  const content = node.innerHTML.trim();
  if (interview === "true") return {
    _interview: true,
    _interviewType: "question",
    content
  };
  if (settings.level === undefined) settings.level = level;
  const element = {
    type: "heading",
    content,
    settings
  };
  return element;
}

function parseBlockquote(node) {
  const interview = node.getAttribute("data-interview");
  if (interview === "true") {
    const answer = node.querySelector("p");
    return {
      _interview: true,
      _interviewType: "answer",
      content: answer?.outerHTML.trim() ?? node.innerHTML.trim()
    };
  }
  return {
    type: "blockquote",
    content: node.textContent.trim()
  };
}

function parseImage(node) {
  const isThumbnail = node.getAttribute("data-thumbnail") === "true";
  if (isThumbnail) return {
    type: "image",
    src: "thumbnail"
  };
  const src = node.getAttribute("src") ?? "";
  const attachmentId = getAttachmentId(node);
  const height = Number(
    node.getAttribute("height")
  ) || undefined;
  const caption = getCaption(node);
  const element = { type: "image" };
  if (attachmentId !== undefined) element.attachmentId = attachmentId;
  if (src) element.src = src;
  if (height !== undefined) element.height = height;
  if (caption !== undefined) element.caption = caption;
  return element;
}

function parseList(node) {
  const items = Array.from(node.children)
    .filter((child) => child.tagName.toLowerCase() === "li")
    .map((item) => item.innerHTML.trim());
  return {
    type: "list",
    items,
    settings: {
      type: node.tagName.toLowerCase() === "ol"
        ? "NUMBERED"
        : "BULLETED"
    }
  };
}

function parseSettings(value) {
  if (!value || value.trim() === "") return {};
  const parts = value.trim().split(/\s+/);
  const settings = {};
  if (parts[0] && parts[0] !== "undefined") settings.type = parts[0];
  if (parts[1] && parts[1] !== "undefined") settings.align = parts[1];
  if (parts[2] && parts[2] !== "undefined") {
    const level = Number(parts[2]);
    if (!Number.isNaN(level)) settings.level = level;
  }
  if (parts[3] && parts[3] !== "undefined") settings.useAkira = parts[3] === "true";
  return settings;
}

function getAttachmentId(node) {
  const className = node.getAttribute("class") ?? "";
  const match = className.match(/wp-image-(\d+)/);
  return match
    ? Number(match[1])
    : undefined;
}

function getCaption(node) {
  const parent = node.parentElement;
  if (!parent || parent.tagName.toLowerCase() !== "p") return undefined;
  const className = parent.getAttribute("class") ?? "";
  if (
    !className.includes("wp-caption")
  ) return undefined;
  return parent.textContent
    ?.replace(node.alt ?? "", "")
    .trim();
}

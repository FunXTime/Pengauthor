import { parseHTML } from "linkedom";
import armies from "@/config/colors/armies.json";

export function colorizeArmies(html) {
  const moreTag = "<!--more-->";
  const moreIndex = html.indexOf(moreTag);
  if (moreIndex === -1) return html;
  const beforeMore = html.slice(0, moreIndex + moreTag.length);
  const afterMore = html.slice(moreIndex + moreTag.length);
  const { document } = parseHTML(
    `<html><head></head><body>${afterMore}</body></html>`
  );
  for (const [armyName, color] of Object.entries(armies).sort(
    ([a], [b]) => b.length - a.length
  )) {
    colorizeArmy(document.body, armyName, color);
  }
  cleanColorSpans(document.body);
  return beforeMore + document.body.innerHTML;
}

function colorizeArmy(root, armyName, color) {
  const walker = root.ownerDocument.createTreeWalker(root, 4);
  const regex = new RegExp(escapeRegExp(armyName), "gi");
  let firstMention = true;
  let node;
  const nodes = [];
  while ((node = walker.nextNode())) {
    if (regex.test(node.nodeValue)) nodes.push(node);
    regex.lastIndex = 0;
  }
  for (const textNode of nodes) {
    const matches = [...textNode.nodeValue.matchAll(regex)];
    if (!matches.length) continue;
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      const colorSpan = findColorSpan(textNode);
      if (firstMention) {
        if (colorSpan) {
          colorSpan.setAttribute("style", `color: ${color};`);
          replaceArmyText(textNode, match, armyName);
        } else {
          wrapArmyText(textNode, match, armyName, color);
        }
        firstMention = false;
      } else if (colorSpan) {
        removeColorFromArmyText(textNode, match, armyName, colorSpan);
      } else {
        replaceArmyText(textNode, match, armyName);
      }
    }
  }
}

function findColorSpan(node) {
  let parent = node.parentElement;
  while (parent) {
    if (
      parent.tagName.toLowerCase() === "span" &&
      hasTextColor(parent)
    ) return parent;
    parent = parent.parentElement;
  }
  return null;
}

function hasTextColor(node) {
  const style = node.getAttribute("style") || "";
  return /(?:^|;)\s*color\s*:/i.test(style);
}

function replaceArmyText(node, match, armyName) {
  const before = node.nodeValue.slice(0, match.index);
  const after = node.nodeValue.slice(
    match.index + match[0].length
  );
  const fragment = node.ownerDocument.createDocumentFragment();
  if (before) fragment.appendChild(
    node.ownerDocument.createTextNode(before)
  );
  fragment.appendChild(
    node.ownerDocument.createTextNode(armyName)
  );
  if (after) fragment.appendChild(
    node.ownerDocument.createTextNode(after)
  );
  node.parentNode.replaceChild(fragment, node);
}

function wrapArmyText(node, match, armyName, color) {
  const before = node.nodeValue.slice(0, match.index);
  const after = node.nodeValue.slice(
    match.index + match[0].length
  );
  const span = node.ownerDocument.createElement("span");
  span.setAttribute("style", `color: ${color};`);
  span.textContent = armyName;
  const fragment = node.ownerDocument.createDocumentFragment();
  if (before) fragment.appendChild(
    node.ownerDocument.createTextNode(before)
  );
  fragment.appendChild(span);
  if (after) fragment.appendChild(
    node.ownerDocument.createTextNode(after)
  );
  node.parentNode.replaceChild(fragment, node);
}

function removeColorFromArmyText(node, match, armyName, colorSpan) {
  const before = node.nodeValue.slice(0, match.index);
  const after = node.nodeValue.slice(
    match.index + match[0].length
  );
  if (
    colorSpan.childNodes.length === 1 &&
    colorSpan.firstChild === node
  ) {
    colorSpan.removeAttribute("style");
    replaceArmyText(node, match, armyName);
    return;
  }
  const fragment = node.ownerDocument.createDocumentFragment();
  if (before) fragment.appendChild(
    node.ownerDocument.createTextNode(before)
  );
  fragment.appendChild(
    node.ownerDocument.createTextNode(armyName)
  );
  if (after) fragment.appendChild(
    node.ownerDocument.createTextNode(after)
  );
  node.parentNode.replaceChild(fragment, node);
}

function cleanColorSpans(root) {
  for (const span of [...root.querySelectorAll("span")]) {
    if (!hasTextColor(span)) span.replaceWith(...span.childNodes);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

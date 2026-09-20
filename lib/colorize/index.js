import { parseHTML } from "linkedom";
import armies from "@/config/colors/armies.json";
import organizations from "@/config/colors/organizations.json";

const entities = {
  ...armies,
  ...organizations
};
const entityNames = Object.keys(entities).sort((a, b) => b.length - a.length);

export function colorizeEntities(html) {
  const moreMatch = html.match(/<!--\s*more\s*-->/i);
  if (!moreMatch) return html;
  const splitIndex = moreMatch.index + moreMatch[0].length;
  const before = html.slice(0, splitIndex);
  const after = html.slice(splitIndex);
  const { document } = parseHTML(`<html><body>${after}</body></html>`);
  const body = document.body;
  for (const name of entityNames) fixCapitalization(document, body, name);
  for (const name of entityNames) colorizeEntity(document, body, name, entities[name]);
  return before + body.innerHTML;
}

function fixCapitalization(document, root, name) {
  const regex = boundaryRegex(name, "gi");
  const walker = document.createTreeWalker(root, 4);
  let node;
  while ((node = walker.nextNode())) node.nodeValue = node.nodeValue.replace(regex, name);
}

function colorizeEntity(document, root, name, color) {
  const regex = boundaryRegex(name, "g");
  const processed = new Set();
  let isFirst = true;
  let node = findNextMatch(document, root, regex, processed);
  while (node) {
    processed.add(node);
    if (isFirst) applyFirstMention(document, node, color);
    else stripFormatting(node);
    isFirst = false;
    node = findNextMatch(document, root, regex, processed);
  }
}

function findNextMatch(document, root, regex, processed) {
  const walker = document.createTreeWalker(root, 4);
  let node;
  while ((node = walker.nextNode())) {
    if (processed.has(node)) continue;
    regex.lastIndex = 0;
    const match = regex.exec(node.nodeValue);
    if (match) return isolateMatch(document, node, match);
  }
  return null;
}

function isolateMatch(document, node, match) {
  const value = node.nodeValue;
  const start = match.index;
  const end = start + match[0].length;
  const before = value.slice(0, start);
  const after = value.slice(end);
  const entityNode = document.createTextNode(value.slice(start, end));
  const parent = node.parentNode;
  parent.replaceChild(entityNode, node);
  if (after) parent.insertBefore(document.createTextNode(after), entityNode.nextSibling);
  if (before) parent.insertBefore(document.createTextNode(before), entityNode);
  return entityNode;
}

function applyFirstMention(document, node, color) {
  stripFormatting(node);
  const strongEl = document.createElement("strong");
  node.replaceWith(strongEl);
  strongEl.appendChild(node);
  const span = document.createElement("span");
  span.setAttribute("style", `color: ${color};`);
  strongEl.replaceWith(span);
  span.appendChild(strongEl);
}

function stripFormatting(node) {
  const strongEl = findAncestor(node, isBold);
  if (strongEl) unwrap(strongEl);
  const colorSpan = findAncestor(node, isColorSpan);
  if (colorSpan) unwrap(colorSpan);
}

function findAncestor(node, predicate) {
  let el = node.parentElement;
  while (el) {
    if (predicate(el)) return el;
    el = el.parentElement;
  }
  return null;
}

function isColorSpan(el) {
  return el.tagName.toLowerCase() === "span" && hasTextColor(el);
}

function isBold(el) {
  const tag = el.tagName.toLowerCase();
  return tag === "strong" || tag === "b";
}

function hasTextColor(el) {
  return /(?:^|;)\s*color\s*:/i.test(el.getAttribute("style") || "");
}

function unwrap(el) {
  if (!el.parentNode) return;
  el.replaceWith(...el.childNodes);
}

function boundaryRegex(name, flags) {
  return new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(name)}(?![A-Za-z0-9])`, flags);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

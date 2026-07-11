export default function list(element) {
  const items = element.items ?? [];
  const settings = element.settings ?? {};
  const type = settings.type ?? "BULLETED";
  let tag = "ul";
  if (type === "NUMBERED") tag = "ol";
  const itemsHTML = items
    .map(item => `\t<li>${item}</li>`)
    .join("\n");

  return (
    `<${tag}>\n`
  + `${itemsHTML}\n`
  + `</${tag}>`
  );
}

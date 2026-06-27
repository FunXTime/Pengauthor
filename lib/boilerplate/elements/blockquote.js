export default function blockquote(element) {
  const text = element.content ?? "Blockquoted text";

  return (
    `<blockquote>\n`
  + `<p style="text-align: center;">${text}</p>\n`
  + `</blockquote>`
  );
}

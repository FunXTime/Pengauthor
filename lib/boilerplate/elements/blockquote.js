export default function blockquote(element, context = {}) {
  const text = element.content ?? "Blockquoted text";
  const spotTheError = context.spotTheError;

  let data = "";
  if (spotTheError && element.isInterview) {
    data = ` data-interview="true"`;
  }

  return (
    `<blockquote${data}>\n`
  + `<p style="text-align: center;">${text}</p>\n`
  + `</blockquote>`
  );
}

import paragraph from "./paragraph";

export default function image(element) {
  const helper = element.helperText ? ` — ${element.helperText}` : "";
  const attachmentId = element.attachmentId;
  const src = element.src;
  const caption = element.caption;
  const height = element.height;

  if (!attachmentId && !src) return (
    paragraph({
      content: `[Image${helper}]\n`,
      settings: { align: "center" }
    })
  );
  if (src?.startsWith(
    "/thumbnails/fallback/"
  )) return (
    `[Featured image${helper}]\n`
  );

  if (caption === "") {
    return (
      `<img class="wp-image-${attachmentId} size-large" src="${src}" alt="" width="500" height="${height}" />\n`
    );
  } else {
    return (
      `[caption id="attachment_${attachmentId}" align="aligncenter" width="500"]<img class="wp-image-${attachmentId} size-large" src="${src}" alt="" width="500" height="${height}" /> ${caption}[/caption]\n`
    );
  }
}

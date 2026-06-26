export default function image(element) {
  const helper = element.helperText
    ? ` — ${element.helperText}`
    : "";

  if (
    !element.attachmentId &&
    !element.src
  ) return `[Image${helper}]\n`;

  if (
    element.src?.startsWith("/thumbnails/fallback/")
  ) return `[Featured image${helper}]\n`;

  if (element.caption == "") {
    return `<img class="wp-image-${element.attachmentId} size-large" src="${element.src}" alt="" width="500" height="${element.height}" />\n`
  } else {
    return `[caption id="attachment_${element.attachmentId}" align="aligncenter" width="500"]<img class="wp-image-${element.attachmentId} size-large" src="${element.src}" alt="" width="500" height="${element.height}" /> ${element.caption}[/caption]\n`;
  }
}
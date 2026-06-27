export default function paragraph(
  element,
  context = {}
) {
  const text = element.content ?? "[Paragraph]";
  const settings = element.settings ?? {};
  const type = settings.type ?? "PLAIN";

  if (type === "SIGNOFF") {
    const color = context.signOffColor ?? "#003366";
    return (
      `<p style="text-align: center;"><span style="color: ${color};"><strong>${context.reporterName}</strong></span>\n`
    + `${context.reporterPosition}</p>`
    )
  }

  if (type === "PRE-INTERVIEW") {
    return `Lastly, <span style="color: #87d1ff;"><strong>Club Penguin Armies</strong></span> reached out to [person(s)] to learn more about his […].`;
  }

  if (element.settings?.align === "center") {
    return `<p style="text-align: center;">${text}</p>`;
  } else {
    return `${text}\n`;
  }

}

export default function paragraph(element, context = {}) {
  const text = element.content ?? "[Paragraph]";
  const settings = element.settings ?? {};
  const type = settings.type ?? "PLAIN";
  const align = settings.align;
  const spotTheError = context.spotTheError;

  let data = "";
  if (context.spotTheError) {
    data = ` data-settings="${type} ${align}"`;
  }

  if (type === "SIGNOFF") {
    const color = context.signOffColor ?? "#003366";
    if (spotTheError) return (
      `<p style="text-align: center;"${data}><span style="color: ${color};"><strong>${context.reporterName}</strong></span><br />${context.reporterPosition}</p>`
    );
    else return (
      `<p style="text-align: center;"><span style="color: ${color};"><strong>${context.reporterName}</strong></span>\n`
    + `${context.reporterPosition}</p>`
    );
  } else if (type === "PRE-INTERVIEW") {
    if (spotTheError) return (
      `<p${data}>Lastly, <span style="color: #87d1ff;"><strong>Club Penguin Armies</strong></span> reached out to [person(s)] to learn more about their […].</p>`
    );
    else return (
      `Lastly, <span style="color: #87d1ff;"><strong>Club Penguin Armies</strong></span> reached out to [person(s)] to learn more about their […].`
    );
  } else {
    if (spotTheError && align === "center") return (
      `<p style="text-align: center;"${data}>${text}</p>`
    );
    else if (spotTheError) return (
      `<p${data}>${text}</p>`
    );
    else if (align === "center") return (
      `<p style="text-align: center;">${text}</p>`
    );
    else return (
      `${text}\n`
    );
  }
}

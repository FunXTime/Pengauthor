export default function heading(element, context = {}) {
  const text = element.content ?? "Section Heading";
  const settings = element.settings ?? {};
  const level = settings.level ?? 3;
  const useAkira = settings.useAkira ?? level === 3;
  const content = useAkira
    ? `<span class="font-akira">${text}</span>`
    : `<strong>${text}</strong>`;
  const spotTheError = context.spotTheError;

  let data = "";
  if (spotTheError && element.isInterview) {
    data = ` data-interview="true" data-settings="${level} ${useAkira}"`;
  }

  return (
    `\n<h${level} style="text-align: center;"${data}>${content}</h${level}>`
  );
}

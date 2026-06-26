export default function heading(
  element
) {
  const text = element.content ?? "Section Heading";
  const settings = element.settings ?? {};
  const level = settings.level ?? 3;
  const useAkira = settings.useAkira ?? level === 3;

  const content = useAkira
    ? `<span class="font-akira">${text}</span>`
    : `<strong>${text}</strong>`;

  return `<h${level} style="text-align: center;">${content}</h${level}>`;
}
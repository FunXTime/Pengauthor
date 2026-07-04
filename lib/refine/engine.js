import {
  DOMAINS,
  DEFAULT_DOMAINS
} from "./domains";

export function refineText(
  text,
  domains = DEFAULT_DOMAINS
) {
  let output = text;

  for (const domain of domains) {
    const rules = DOMAINS[domain];
    if (!rules) continue;

    for (const rule of rules) {
      if (rule.type === "replace") {
        output = output.replaceAll(
          rule.from,
          rule.to
        );
      }

      if (rule.type === "regex") {
        text = text.replace(
          new RegExp(rule.pattern, rule.flags ?? "g"),
          rule.replacement
        );
      }
    }
  }

  return output;
}

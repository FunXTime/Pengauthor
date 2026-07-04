import grammar from "./rules/grammar.json";
import style from "./rules/style.json";
import wordpress from "./rules/wordpress.json";
import properNouns from "./rules/properNouns.json";

export const DOMAINS = {
  grammar,
  style,
  wordpress,
  properNouns
};

export const DEFAULT_DOMAINS = [
  "grammar",
  "style",
  "wordpress"
];

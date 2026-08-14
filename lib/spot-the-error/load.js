import fs from "node:fs/promises";
import path from "node:path";

export async function loadPost(id) {
  const base = path.join(
    process.cwd(),
    "config", "spot-the-error",
    id
  );
  const edited = JSON.parse(
    await fs.readFile(path.join(base, "edited.json"), "utf8")
  );
  const unedited = JSON.parse(
    await fs.readFile(path.join(base, "unedited.json"), "utf8")
  );
  return { edited, unedited };
}

export async function loadDifferences(id) {
  const { edited, unedited } = await loadPost(id);
  const differences = [];
  const length = Math.max(edited.length, unedited.length);
  for (let i = 0; i < length; i++) {
    if (JSON.stringify(edited[i]) !== JSON.stringify(unedited[i])) {
      differences.push({
        index: i,
        edited: edited[i],
        unedited: unedited[i]
      });
    }
  }
  return differences;
}

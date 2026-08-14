"use server";

import {
  htmlToJson,
  loadPost,
  loadDifferences,
  compare
} from "@/lib/spot-the-error";

export async function finishSpotTheError(
  id,
  html
) {
  const { edited } = await loadPost(id);
  const input = htmlToJson(html);
  const differences = compare(input, edited);

  return {
    input,
    expected: edited,
    differences,
    maxDifferences: (await loadDifferences(id)).length
  };
}

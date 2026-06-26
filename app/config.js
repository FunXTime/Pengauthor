import main from "@/config/main.json";

export const REPORTER_POSITIONS = main.reporterPositions;
export const POST_TYPES =
  Object.fromEntries(
    Object.entries(main.postTypes).map(
      ([category, types]) => [
        category,
        Object.keys(types)
      ]
    )
  );
export const POST_CATEGORIES = Object.keys(main.postTypes);
export const THUMBNAIL_MAPPINGS =
  Object.fromEntries(
    Object.values(main.postTypes)
      .flatMap((types) =>
        Object.entries(types)
      )
  );
export const PALETTES = main.palettes;
export const DEFAULT_PALETTE = main.currentPalette;
export const DEFAULT_GENERATOR_DATA = structuredClone(main.defaultGeneratorData);
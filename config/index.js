import main from "./main.json";
export const REPORTER_POSITIONS = main.reporterPositions;
export const POST_TYPES = Object.fromEntries(
  Object.entries(main.postTypes)
    .map(([category, types]) => [
      category, Object.keys(types)
    ])
);
export const POST_CATEGORIES = Object.keys(main.postTypes);
export const THUMBNAIL_MAPPINGS = Object.fromEntries(
  Object.values(main.postTypes)
    .flatMap((types) => Object.entries(types))
);
export const PALETTES = main.palettes;
export const CURRENT_PALETTE = main.currentPalette;
export const DEFAULT_GENERATOR_DATA = structuredClone(main.defaultGeneratorData);
export const GLOBAL_TAGS = main.globalTags;

import reporterList from "./reporterList.json";
export const REPORTERS = reporterList;

import DEFAULT from "./thumbnails/DEFAULT.json";
import CC from "./thumbnails/CC.json";
import LC from "./thumbnails/LC.json";
import MM from "./thumbnails/MM.json";
export const THUMBNAILS = {
  DEFAULT: DEFAULT,
  CC: CC,
  LC: LC,
  MM: MM
}

import sites from "./sites.json";
export const siteData = sites;

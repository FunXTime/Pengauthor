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
export const GLOBAL_TAGS = main.evergreenTags;
export const DEFAULT_NOTE_HASH = main.defaultNote;

import checkup from "./checkup.json";
export const CHECKUP_QUESTIONS = checkup;

import sites from "./research-sources.json";
export const SITEDATA = sites;

import questionnaire from "./questionnaire.json";
export const QUESTIONNAIRE = questionnaire;

import reporterList from "./reporterList.json";
export const REPORTERS = reporterList;

import suggestedTags from "./suggestedTags.json";
export const SUGGESTED_TAGS = suggestedTags;

import DEFAULT from "./thumbnails/DEFAULT.json";
import MM from "./thumbnails/MM.json";
import LC from "./thumbnails/LC.json";
import HW from "./thumbnails/HW.json";
import CC from "./thumbnails/CC.json";
export const THUMBNAILS = {
  DEFAULT: DEFAULT,
  MM: MM,
  LC: LC,
  HW: HW,
  CC: CC
}

import spotTheError from "./spot-the-error/index.json";
export const SPOT_THE_ERROR_POSTS = spotTheError;

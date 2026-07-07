import { SITEDATA } from "@/config";

export const WORDPRESS_SITES = SITEDATA.sites;
export const DEFAULT_SITE = SITEDATA.defaultSite;
export * from "./fetch";
export * from "./posts";
export * as rest from "./rest";
export * as wpcom from "./wpcom";

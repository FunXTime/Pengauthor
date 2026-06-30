import { siteData } from "@/config/";

export const WORDPRESS_SITES = siteData.sites;
export const DEFAULT_SITE = siteData.defaultSite;
export * from "./fetch";
export * from "./posts";
export * as rest from "./rest";
export * as wpcom from "./wpcom";

import { get } from "../../request";
import { Package, Score } from "../";
import { getSuggestions, SuggestionsResponse, SuggestionsResult } from "./suggestions";

export type SearchQuery = {
  terms?: string | string[];
} & SearchQueryQualifiers;

type SearchQueryQualifiers = {
  scope?: string;
  author?: string;
  maintainer?: string;
  keywords?: string;
  deprecated?: boolean;
  unstable?: boolean;
  insecure?: boolean;
  boostExact?: boolean;
  scoreEffect?: number;
  qualityWeight?: number;
  popularityWeight?: number;
  maintenanceWeight?: number;
}

export type SearchResponse = {
  total: number;
  results: SearchResult[];
}

export type SearchResult = {
  package: Package;
  score: Score;
  searchScore: number;
}

function qualifier(key: string, value: string | number) {
  return `+${key}:${value}`;
}

function getQualifier(key: string, value?: string | number | boolean) {
  if(typeof value === "string" || typeof value === "number") {
    return qualifier(key, value);
  } else if(typeof value === "boolean") {
    return qualifier(value ? "is" : "not", key);
  } else {
    return "";
  }
}

function listQualifiers(options: SearchQueryQualifiers = {}) {
  return Object.keys(options) as (keyof SearchQueryQualifiers)[];
}

function getQualifiers(options: SearchQueryQualifiers = {}) {
  return listQualifiers({
    scope: options.scope,
    author: options.author,
    maintainer: options.maintainer,
    keywords: options.keywords,
    deprecated: options.deprecated,
    unstable: options.unstable,
    insecure: options.insecure,
    boostExact: options.boostExact,
    scoreEffect: options.scoreEffect,
    qualityWeight: options.qualityWeight,
    popularityWeight: options.popularityWeight,
    maintenanceWeight: options.maintenanceWeight
  }).reduce((retval, key) => {
    return `${retval}${getQualifier(key, options[key])}`;
  }, "");
}

function getTerms(options: SearchQuery = {}) {
  if(Array.isArray(options.terms)) {
    return options.terms.join("+");
  } else if(typeof options.terms === "string") {
    return options.terms;
  } else {
    return "";
  }
}

function getQuery(options: SearchQuery = {}) {
  return `${getTerms(options)}${getQualifiers(options)}`;
}

export function getSearch(query: SearchQuery, from?: number, size?: number): Promise<SearchResponse> {
  return get("/search", {
    q: getQuery(query),
    from,
    size
  });
}

export {
  getSuggestions,
  SuggestionsResponse,
  SuggestionsResult
}

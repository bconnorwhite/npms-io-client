import { get } from "../../request";
import { Package, Score } from "../";

export type SuggestionsResponse = SuggestionsResult[];

export type SuggestionsResult = {
  package: Package;
  score: Score;
  searchScore: number;
  highlight: string;
}

export function getSuggestions(query: string, size?: number): Promise<SuggestionsResponse> {
  return get("/search/suggestions/", {
    q: query,
    size
  });
}

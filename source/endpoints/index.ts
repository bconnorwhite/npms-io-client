import {
  getSearch,
  getSuggestions,
  SearchResponse,
  SearchResult,
  SuggestionsResponse,
  SuggestionsResult,
  SearchQuery
} from "./search";
import {
  getPackage,
  getPackages,
  PackagesResponse,
  PackageResult,
  PackageCollected,
  PackageEvaluation
} from "./package";

export type Package = {
  name: string;
  scope: string | "unscoped";
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  author?: Person;
  publisher: Person;
  maintainers: Person[];
}

type Person = {
  username: string;
  email: string;
}

export type Score = {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  }
}

export {
  getSearch,
  getSuggestions,
  getPackage,
  getPackages,
  SearchResponse,
  SearchResult,
  SuggestionsResponse,
  SuggestionsResult,
  PackagesResponse,
  PackageResult,
  SearchQuery,
  PackageCollected,
  PackageEvaluation
}

<div align="center">
  <h1>npms-io-client</h1>
  <a href="https://npmjs.com/package/npms-io-client">
    <img alt="npm" src="https://img.shields.io/npm/v/npms-io-client.svg">
  </a>
  <a href="https://github.com/bconnorwhite/npms-io-client">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/npms-io-client.svg">
  </a>
  <a href="https://github.com/bconnorwhite/npms-io-client">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/npms-io-client?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> A typed [npms.io](https://npms.io/) api client.
>
> Uses isomorphic-fetch to support both node and browser environments.


## Installation

```bash
yarn add npms-io-client
```

```bash
npm install npms-io-client
```

## API
- [Search](#Search)
- [Suggestions](#Suggestions)
- [Package](#Package)
- [Packages](#Packages)

##

### Search
```ts
import { getSearch } from "npms-io-client";

getSearch({ terms: "chalk" }).then((result) => {
  console.log(result);
  // {
  //   total: 423,
  //   results: [{
  //     package: {
  //       name: 'chalk',
  //       scope: 'unscoped',
  //       version: '4.1.0',
  //       ...
  //     },
  //     ...
  //   ]
  // }
});
```

#### Types:
```ts
getSearch(query: SearchQuery, from?: number, size?: number) => Promise<SearchResponse>;

type SearchQuery = {
  terms?: string | string[];
} & SearchQueryQualifiers;

type SearchQueryQualifiers = {
  scope?: string;             // Filter by scope
  author?: string;            // Filter by author
  maintainer?: string;        // Filter by maintainer
  keywords?: string;          // Filter by keywords (Separate multiple keywords with commas. You may also exclude keywords e.g: -framework).
  deprecated?: boolean;       // Filter by deprecated / not deprecated
  unstable?: boolean;         // Filter by unstable (< 1.0.0) / stable (> 1.0.0)
  insecure?: boolean;         // Filter packages with vulnerabilities
  boostExact?: boolean;       // Boost exact matches. Defaults to true.
  scoreEffect?: number;       // Set the effect that package scores have for the final search score, defaults to 15.3
  qualityWeight?: number;     // Set the weight that quality has for the each package score, defaults to 1.95
  popularityWeight?: number;  // Set the weight that popularity has for the each package score, defaults to 3.3
  maintenanceWeight?: number; // Set the weight that the quality has for the each package score, defaults to 2.05
}

type SearchResponse = {
  total: number;
  results: SearchResult[];
}

type SearchResult = {
  package: Package;
  score: Score;
  searchScore: number;
}
```

##

<br />

### Suggestions
```ts
import { getSuggestions } from "npms-io-client";

getSuggestions("chal").then((results) => {
  console.log(results);
  // [
  //   {
  //     package: {
  //       name: 'chalk',
  //       scope: 'unscoped',
  //       version: '4.1.0',
  //       ...
  //     }
  //   },
  //   ...
  // ]
})
```
#### Types:
```ts
getSuggestions(query: string, size?: number) => Promise<SuggestionsResponse>;
```

##

<br />

### Package
```ts
import { getPackage } from "npms-io-client";

getPackage("chalk").then((result) => {
  console.log(result);
  // {
  //   "analyzedAt": "2020-08-03T09:35:15.248Z",
  //   "collected": { "metadata": { ... }, "npm": { ... }, ... },
  //   "evaluation": { "quality": { ... }, "popularity": { ... }, ... }
  //   "score": { "final": 0.966624747619474, "detail": { "quality": 0.9545507877497884, "popularity": 0.9437035852952291, ... } }
  // }
});
```

#### Types:
```ts
getPackage(name: string) => Promise<PackageResult>;

type PackageResult = {
  analyzedAt: string;
  collected: PackageCollected;
  evaluation: PackageEvaluation;
  score: Score;
}
```

##

<br />

### Packages
```ts
import { getPackages } from "npms-io-client";

getPackages(["chalk", "react"]).then((results) => {
  console.log(results);
  // {
  //   chalk: {
  //     analyzedAt: '2020-08-03T09:35:15.248Z',
  //     collected: {
  //       metadata: { ... },
  //       npm: { ... },
  //       github: { ... },
  //       source: { ... }
  //     },
  //     evaluation: { quality: { ... }, popularity: { ... }, maintenance: { ... } },
  //     score: { final: 0.966624747619474, detail: { ... } }
  //   },
  //   react: {
  //     analyzedAt: '2020-08-28T11:38:05.049Z',
  //     collected: {
  //       metadata: { ... },
  //       npm: { ... },
  //       github: { ... },
  //       source: { ... }
  //     },
  //     evaluation: { quality: { ... }, popularity: { ... }, maintenance: { ... } },
  //     score: { final: 0.9387208252920034, detail: { ... } }
  //   }
  // }
});

```
#### Types:
```ts
getPackages(packages: string[]): Promise<PackagesResponse>;

type PackagesResponse = PackageResult[];
```

##

<br />


<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/npms-io-client.svg"></h2>

- [isomorphic-fetch](https://npmjs.com/package/isomorphic-fetch): Isomorphic WHATWG Fetch API, for Node & Browserify
- [stringify-json-object](https://npmjs.com/package/stringify-json-object): Stringify and format a JSON object.
- [url-join](https://npmjs.com/package/url-join): Join urls and normalize as in path.join.


##

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/npms-io-client.svg"></h2>

- [@bconnorwhite/bob](https://npmjs.com/package/@bconnorwhite/bob): Bob builds and watches typescript projects.
- [@types/isomorphic-fetch](https://npmjs.com/package/@types/isomorphic-fetch): TypeScript definitions for isomorphic-fetch
- [@types/url-join](https://npmjs.com/package/@types/url-join): TypeScript definitions for url-join

##

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/npms-io-client.svg"></h2>

[MIT](https://mit-license.org/)

import { get } from "../../request";
import { getPackages, PackagesResponse } from "./packages";
import { Score, Package } from "../";

export type PackageResult = {
  analyzedAt: string;
  collected: PackageCollected;
  evaluation: PackageEvaluation;
  score: Score;
}

type Dependencies = {
  [name: string]: string;
}

export type PackageCollected = {
  metadata: Package & {
    repository: Repository;
    license: string;
    releases: Range[];
    hasSelectiveFiles?: boolean;
    hasTestScript?: boolean;
    readme?: string;
    deprecated?: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    peerDependencies?: Dependencies;
    bundledDependencies?: Dependencies;
    optionalDependencies?: Dependencies;
  };
  npm: {
    downloads: Range[];
    dependentsCount: number;
    starsCount: number;
  };
  github: {
    homepage: string;
    starsCount: number;
    forksCount: number;
    subscribersCount: number;
    issues: {
      count: number;
      openCount: number;
      distribution: {
        "3600": number;
        "10800": number;
        "32400": number;
        "97200": number;
        "291600": number;
        "874800": number;
        "2624400": number;
        "7873200": number;
        "23619600": number;
        "70858800": number;
        "212576400": number;
      };
      isDisabled: false;
      forkOf?: string;
    };
    contributors: GitHubContributor[];
    commits: Range[];
    statuses?: GitHubStatus[];
  };
  source: {
    files: {
      readmeSize: number;
      testsSize: number;
      hasChangelog?: boolean;
      hasNpmIgnore?: boolean;
      hasShrinkwrap?: boolean;
    };
    badges?: Badge[];
    linters?: string[];
    outdatedDependencies?: {
      [name: string]: {
        required: string;
        warn?: {
          code: string;
        };
        stable?: string;
        latest?: string;
      };
    } | boolean;
    vulnerabilities?: unknown[] | boolean;
    coverage?: number;
  };
}

type Repository = {
  type: string;
  url: string;
  directory?: string;
}

type Range = {
  from: string;
  to: string;
  count: number;
}

type GitHubContributor = {
  username: string;
  commitsCount: number;
}

type GitHubStatus = {
  context: string;
  state: "success" | "pending" | "error" | "failure";
}

type Badge = {
  urls: {
    [name: string]: string;
  };
  info: {
    service: string;
    type: string;
    modifiers?: {
      [name: string]: string;
    };
  };
}

export type PackageEvaluation = {
  quality: {
    carefulness: number;
    tests: number;
    health: number;
    branding: number;
  };
  popularity: {
    communityInterest: number;
    downloadsCount: number;
    downloadsAcceleration: number;
    dependentsCount: number;
  };
  maintenance: {
    releasesFrequency: number;
    commitsFrequency: number;
    openIssues: number;
    issuesDistribution: number;
  };
}

export function getPackage(name: string): Promise<PackageResult> {
  return get(`/package/${encodeURIComponent(name)}`);
}

export {
  getPackages,
  PackagesResponse
}

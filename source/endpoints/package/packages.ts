import { post } from "../../request";
import { PackageResult } from "./";

export type PackagesResponse = {
  [name: string]: PackageResult;
};

export function getPackages(packages: string[]): Promise<PackagesResponse> {
  return post(`/package/mget`, packages);
}

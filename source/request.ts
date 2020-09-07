import fetch from "cross-fetch";
import join from "url-join";
import stringify, { JSONObject, JSONArray } from "stringify-json-object";

type Query = {
  [key: string]: string | number | undefined;
};

async function request(path: string, options: RequestInit = {}) {
  return fetch(join("https://api.npms.io/v2/", path), {
    ...options,
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      ...options.headers
    }
  }).then((res) => res.json());
}

function getPath(path: string, query?: Query) {
  if(query) {
    return Object.keys(query).reduce((retval, key, index) => {
      const value = query[key];
      if(typeof value === "string" || typeof value === "number") {
        return `${retval}${index > 0 ? "&" : ""}${key}=${value}`;
      } else {
        return retval;
      }
    }, `${path}?`);
  } else {
    return path;
  }
}

export function get(path: string, query?: Query) {
  return request(getPath(path, query), {
    method: "GET"
  });
}

export function post(path: string, body?: JSONObject | JSONArray) {
  return request(path, {
    method: "POST",
    body: stringify(body)
  });
}

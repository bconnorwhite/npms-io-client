const { getSearch } = require("./build/index.js");

getSearch({ terms: "chalk" }).then((response) => {
  console.log(response);
});

const { getSuggestions } = require("./build/index.js");

getSuggestions("chal").then((results) => {
  console.log(results);
});

const { getPackage } = require("./build/index.js");

getPackage("chalk").then((result) => {
  console.log(result);
});

const { getPackages } = require("./build/index.js");

getPackages(["chalk", "react"]).then((results) => {
  console.log(results);
});

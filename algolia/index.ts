import algoliasearch from "algoliasearch";

const searchClient = algoliasearch(
    "F1C8OJA8J4" as string,
    "a612e1fb117c81d544ac60b093dc04fc" as string
);

export default searchClient;

export * from "./indices";
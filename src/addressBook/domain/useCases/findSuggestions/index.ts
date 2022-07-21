import getSuggestions from "../../../infraestruture/repositories/getSuggestions";

export default async function findSuggestions(term: string) {
  return await getSuggestions(term);
}

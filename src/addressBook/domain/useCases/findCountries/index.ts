import getCountries from "../../../infraestruture/repositories/getCountries";

export default async function findCountries() {
  return await getCountries();
}

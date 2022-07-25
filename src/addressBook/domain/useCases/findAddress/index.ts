import getCountries from "../../../infraestruture/repositories/getCountries";

export default async function findAddress() {
  return await getCountries();
}

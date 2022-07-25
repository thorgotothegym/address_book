import getAddress from "../../../infraestruture/repositories/getAddress";

export default async function findAddress() {
  return await getAddress();
}

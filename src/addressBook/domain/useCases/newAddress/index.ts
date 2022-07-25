import postAddress from "../../../infraestruture/repositories/postAddress";

export default function newAddress(
  country: string,
  id: string,
  line1: string,
  line2: string,
  line3: string,
  postcode: string,
  town: string
) {
  return postAddress({ country, id, line1, line2, line3, postcode, town });
}

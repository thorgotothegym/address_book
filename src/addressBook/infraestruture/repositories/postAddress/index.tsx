import api from "../../../../common/infraestructure/api";
import Address from "../../../domain/entities/Address";
import { adaptPostAddress } from "../../adapters/adaptPostAddress";

export async function postAddress({
  country,
  line1,
  line2,
  line3,
  postcode,
  town,
}: Address) {
  await api.post(
    `http://localhost:3004/address`,
    adaptPostAddress({
      country,
      line1,
      line2,
      line3,
      postcode,
      town,
    })
  );
}

export default postAddress;

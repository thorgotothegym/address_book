import api from "../../../../common/infraestructure/api";
import Address from "../../../domain/entities/Address";
import { restoreAddress } from "../../builders/restoreAddress";

const getAddress = async (): Promise<Address[]> => {
  const { data } = await api.get(`http://localhost:3004/addres`);

  return data.map(restoreAddress);
};

export default getAddress;

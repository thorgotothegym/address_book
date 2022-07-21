import api from "../../../../common/infraestructure/api";
import Country from "../../../domain/entities/Country";
import { restoreCountry } from "../../builders/restoreCountry";

const getCountries = async (): Promise<Country[]> => {
  const { data } = await api.get(`https://restcountries.com/v3.1/all`);

  return data.map(restoreCountry);
};

export default getCountries;

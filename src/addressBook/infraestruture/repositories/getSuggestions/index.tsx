import api from "../../../../common/infraestructure/api";
import Suggestions from "../../../domain/entities/Suggestions";
import { restoreSuggestions } from "../../builders/restoreSuggestions";

const getSuggestions = async (term: string): Promise<Suggestions[]> => {
  const { data } = await api.get(
    `https://api.getAddress.io/autocomplete/${term}?api-key=q-ppSArltkKZy8Ou6XQl6g35976`
  );

  return data.map(restoreSuggestions);
};

export default getSuggestions;

import { useQuery } from "react-query";
import { CommonQueryKeys } from "../queryKeys";
import Suggestions from "../../../../domain/entities/Suggestions";
import findSuggestions from "../../../../domain/useCases/findSuggestions";

const useFindSuggestions = (term: string) => {
  const query = useQuery<Suggestions[] | undefined, Error>(
    [CommonQueryKeys.SUGGESTIONS],
    () => {
      return findSuggestions(term);
    },
    {
      initialData: undefined,
    }
  );

  return query;
};

export default useFindSuggestions;

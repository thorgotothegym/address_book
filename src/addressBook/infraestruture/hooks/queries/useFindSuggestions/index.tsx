import { useQuery, useQueryClient } from "react-query";
import { CommonQueryKeys } from "../queryKeys";
import Suggestions from "../../../../domain/entities/Suggestions";
import findSuggestions from "../../../../domain/useCases/findSuggestions";

const useFindSuggestions = (term: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<Suggestions[] | undefined, Error>(
    [CommonQueryKeys.SUGGESTIONS],
    () => {
      return findSuggestions(term);
    },
    {
      initialData: undefined,
      retry: true,
      onError: () => {
        console.log("error");
      },
      onSuccess: () => {
        console.log("Data has been updated");
        queryClient.invalidateQueries([CommonQueryKeys.SUGGESTIONS, query]);
      },
    }
  );

  return query;
};

export default useFindSuggestions;

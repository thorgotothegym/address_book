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
        console.log("An error has occurred, please try again");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CommonQueryKeys.SUGGESTIONS, query]);
      },
    }
  );

  return query;
};

export default useFindSuggestions;

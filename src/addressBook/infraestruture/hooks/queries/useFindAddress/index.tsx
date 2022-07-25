import { useQuery, useQueryClient } from "react-query";
import { CommonQueryKeys } from "../queryKeys";
import findAddress from "../../../../domain/useCases/findAddress";
import Address from "../../../../domain/entities/Address";

const useFindAddress = () => {
  const queryClient = useQueryClient();
  const query = useQuery<Address[] | undefined, Error>(
    [CommonQueryKeys.ADDRESS],
    () => {
      return findAddress();
    },
    {
      initialData: undefined,
      retry: true,
      onError: () => {
        console.log("error");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CommonQueryKeys.ADDRESS, query]);
      },
    }
  );

  return query;
};

export default useFindAddress;

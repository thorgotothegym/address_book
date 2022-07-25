import { useMutation, useQueryClient } from "react-query";
import { CommonQueryKeys } from "../../queries/queryKeys";
import Address from "../../../../domain/entities/Address";
import postAddress from "../../../repositories/postAddress";

export default function usePostAddress() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ country, id, line1, line2, line3, postcode, town }: Address) =>
      postAddress({ country, id, line1, line2, line3, postcode, town }),
    {
      onSuccess: () => {
        alert("A new address has been added");
        queryClient.invalidateQueries([CommonQueryKeys.ADDRESS]);
      },
    }
  );
  return mutation;
}

import { useQuery } from "react-query";
import { CommonQueryKeys } from "../queryKeys";
import findCountries from "../../../../domain/useCases/findCountries";
import Country from "../../../../domain/entities/Country";

const useFindCountries = () => {
  const query = useQuery<Country[] | undefined, Error>(
    [CommonQueryKeys.COUNTRIES],
    () => {
      return findCountries();
    },
    {
      initialData: undefined,
    }
  );

  return query;
};

export default useFindCountries;

import Country from "../../../domain/entities/Country";

export const restoreCountry = ({ name }: Country) => {
  return new Country({
    name,
  });
};

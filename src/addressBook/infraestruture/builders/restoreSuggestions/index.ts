import Suggestions from "../../../domain/entities/Suggestions";

export const restoreSuggestions = ({ address, id }: Suggestions) => {
  return new Suggestions({
    address,
    id,
  });
};

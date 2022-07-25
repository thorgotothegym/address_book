import Address from "../../../domain/entities/Address";

export const adaptPostAddress = ({
  country,
  id,
  line1,
  line2,
  line3,
  postcode,
  town,
}: Address) => {
  return new Address({
    country,
    id,
    line1,
    line2,
    line3,
    postcode,
    town,
  });
};

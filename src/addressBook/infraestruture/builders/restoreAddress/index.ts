import Address from "../../../domain/entities/Address";

export const restoreAddress = ({
  country,
  line1,
  line2,
  line3,
  postcode,
  town,
}: Address) => {
  return new Address({
    country,
    line1,
    line2,
    line3,
    postcode,
    town,
  });
};

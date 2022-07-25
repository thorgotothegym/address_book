export type AddressConstructorArgs = {
  line1: string;
  line2: string;
  line3: string;
  town: string;
  postcode?: string;
  country: string;
};

export default class Address {
  readonly line1: string;
  readonly line2: string;
  readonly line3: string;
  readonly town: string;
  readonly postcode?: string;
  readonly country: string;

  constructor({
    line1,
    line2,
    line3,
    town,
    postcode,
    country,
  }: AddressConstructorArgs) {
    this.line1 = line1;
    this.line2 = line2;
    this.line3 = line3;
    this.town = town;
    this.postcode = postcode;
    this.country = country;
  }
}

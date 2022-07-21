export type SuggestionsConstructorArgs = {
  address: string;
  id: string;
};

export default class Suggestions {
  readonly address: string;
  readonly id: string;

  constructor({ address, id }: SuggestionsConstructorArgs) {
    this.id = id;
    this.address = address;
  }
}

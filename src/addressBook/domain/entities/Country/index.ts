interface CountryProperties {
  common: string;
  official: string;
}

export type CountryConstructorArgs = {
  name: CountryProperties;
};

export default class Country {
  readonly name: CountryProperties;

  constructor({ name }: CountryConstructorArgs) {
    this.name = name;
  }
}

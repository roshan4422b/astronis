declare module "country-telephone-data" {
  type CountryTelephoneEntry = {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    format: string;
  };

  const countryTelephoneData: {
    allCountries: CountryTelephoneEntry[];
  };

  export default countryTelephoneData;
}

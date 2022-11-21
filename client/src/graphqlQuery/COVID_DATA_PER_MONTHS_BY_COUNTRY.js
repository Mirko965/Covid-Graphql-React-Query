import {gql} from "@apollo/client";

export const COVID_DATA_PER_MONTHS_BY_COUNTRY = (arg) => {
  return (
    gql`
        query GetCountryDataPerMonths($country:[String]){
            countryDataPerMonthsByCountry(country: $country){
                name
                country_code
                data {
                    date,
                    ${arg}
                }
            }
        }
    `
  )
}
import {gql} from "@apollo/client";

export const COUNTRIES_LIST = () => {
  return (
    gql`
        query GetCountriesName{
            countriesName {
                name
            }
        }
    `
  )
}
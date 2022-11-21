import {gql} from "@apollo/client";

export const COVID_DATA = (arg) => {
  return (
    gql`
        query GetData($country:[String]){
            covidData(country: $country){
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
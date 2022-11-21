export const COVID_DATA_PER_MONTHS = `
    query GetDataPerMonths($country:String){
        covidDataPerMonths(country: $country){
            name
            country_code
            data {
                date,
                total_deaths_per_million,
                total_cases_per_million,
                total_deaths
                total_cases
            }
        }
    }
`
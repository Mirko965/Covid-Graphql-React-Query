import {countriesData} from "../fetchData/countriesData.js";
import {initialCountriesProperties} from "./properties/initialCountriesProperties.js";

export const initialCountriesData = async () => {
  try {
    const fetch = await countriesData()
    
    return fetch.map((value) => {
      return initialCountriesProperties(value)
    })
  } catch (e) {
    console.log(e)
  }
  
}


export const initialCovidData = async () => {
  try {
    const fetch = await countriesData()
    return fetch.map((value) => {
      
      return {
        name: value.name,
        country_code: value['country_code'],
        alpha_3: value['alpha_3'],
        data: value.data
      }
    })
  } catch (e) {
    console.log(e)
  }
}

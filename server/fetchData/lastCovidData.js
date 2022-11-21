import {covidDataProperties} from "../db/properties/covidDataProperties.js";
import * as country_code from "../db/ISO-3166-Countries-with-Regional-Codes-master/all/all.json" assert {type: "json"}
import {fetch} from "./fetch.js";

const url = `https://covid.ourworldindata.org/data/latest/owid-covid-latest.json`

export const lastCovidData = async () => {
  const _fetch = await fetch(url)
  return Object.entries(_fetch).map(([key,value]) => {
    key = key.split('_')[0]
    if(key === 'OWID'){
      key = value.location
      return {name: value.location,data: covidDataProperties(value) }
    }
    return country_code.default.flatMap(data => {
      if (key === data['alpha-3']) {
        return {name: value.location,'alpha_3':key,data: {...covidDataProperties(value),region:data.region}}
      }
    }).filter(d => d)
    //return {name: value.location,'alpha-3':key,data: covidDataProperties(value)}
  }).flat(2)
  
}
//lastCovidData().then(d => console.log(d))
//lastCovidData().catch(console.dir)
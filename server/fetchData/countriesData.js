import {fetch} from "./fetch.js";
import * as country_code from "../db/ISO-3166-Countries-with-Regional-Codes-master/all/all.json" assert {type: "json"}


const url = `https://covid.ourworldindata.org/data/owid-covid-data.json`
export const countriesData = async () => {
  try {
    const covidData = await fetch(url)
    return Object.entries(covidData).flatMap(([key, value]) => {
      if(key.split('_')[0] === "OWID" ){
        const name = value.location
        const {location,population, data} = value
        return {name,location,population ,data}
      }
    
      value = Object.assign({}, {'alpha_3':key},value)
      return country_code.default.flatMap(data => {
        data = {
          name: value.location,
          region: data.region,
          alpha_2:data['alpha-2'],
          alpha_3:data['alpha-3'],
          country_code:data["country-code"],
          iso_3166_2:data["iso_3166-2"],
          sub_region:data["sub-region"],
          intermediate_region:data["intermediate-region"],
          region_code:data["region-code"],
          sub_region_code:data["sub-region-code"],
          intermediate_region_code:data["intermediate-region-code"]
        }
        
        if (key === data['alpha_3']) {
          
          return {...data, ...value}
        }
      }).filter(d => d)
    }).map(c => {
     
      const name = {name: c.name}
      const alpha_3 = {'alpha_3':c['alpha_3']}
      const country_code = {"country_code":c['country_code']}
      const region_code = {"region_code":c['region_code']}
      c.data = c.data.map(v => {
        v = Object.assign(v, name,alpha_3,country_code,region_code)
        return v
      })
     
      return c
    })
    

  } catch (e) {
    console.log(e)
  }

}

//  const owidData = async () => {
//   try {
//     const covidData = await fetch(url)
//     return Object.entries(covidData).map(([key, value]) => {
//       if(key.split('_')[0] === "OWID" )
//       return value
//     }).filter(d => d)
//   }catch (e) {
//     console.log(e)
//   }
//
// }


// export const countriesData = async () => {
//   try {
//     const covidData = await fetch(url)
//     return country_code.default.flatMap(data => {
//
//       return Object.entries(covidData).filter(([key, value]) => {
//         if(key !== data['alpha-3']){
//           return key
//         }
//       }).filter(d => d)
//     })
//   }catch (e) {
//     console.log(e)
//   }
//
// }

//countriesData().then(d => console.log(d))
//countriesData().catch(console.dir)
//owidData().then(d => console.log(d))

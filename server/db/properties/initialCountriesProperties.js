export const initialCountriesProperties = (value) => {
  
  return {
    name: value.location,
    country:value.location,
    continent: value.continent,
    population: value.population,
    population_density: value.population_density,
    median_age: value.median_age,
    aged_65_older: value.aged_65_older,
    aged_70_older: value.aged_70_older,
    gdp_per_capita: value.gdp_per_capita,
    extreme_poverty: value.extreme_poverty,
    cardiovasc_death_rate: value.cardiovasc_death_rate,
    diabetes_prevalence: value.diabetes_prevalence,
    female_smokers: value.female_smokers,
    male_smokers: value.male_smokers,
    handwashing_facilities: value.handwashing_facilities,
    hospital_beds_per_thousand: value.hospital_beds_per_thousand,
    life_expectancy: value.life_expectancy,
    human_development_index: value.human_development_index,
    alpha_2: value['alpha_2'],
    alpha_3: value['alpha_3'],
    country_code: value['country_code'],
    iso_3166_2: value['iso_3166_2'],
    region: value.region,
    sub_region: value['sub_region'],
    intermediate_region: value['intermediate_region'],
    region_code: value['region_code'],
    sub_region_code: value['sub_region_code'],
    intermediate_region_code: value['intermediate_region_code'],
  
  }
}
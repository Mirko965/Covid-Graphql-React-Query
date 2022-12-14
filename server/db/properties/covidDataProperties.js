export const covidDataProperties = (value) => {
  return {
    "date": value.last_updated_date,
    "name": value.location,
    continent: value.continent,
    region: value.region,
    "total_cases": value.total_cases,
    "new_cases": value.new_cases,
    "new_cases_smoothed": value.new_cases_smoothed,
    "total_deaths": value.total_deaths,
    "new_deaths": value.new_deaths,
    "new_deaths_smoothed": value.new_cases_smoothed,
    "total_cases_per_million": value.total_cases_per_million,
    "new_cases_per_million": value.new_cases_per_million,
    "new_cases_smoothed_per_million": value.new_cases_smoothed_per_million,
    "total_deaths_per_million": value.total_deaths_per_million,
    "new_deaths_per_million": value.new_deaths_per_million,
    "new_deaths_smoothed_per_million": value.new_deaths_smoothed_per_million,
    "reproduction_rate": value.reproduction_rate,
    "icu_patients": value.icu_patients,
    "icu_patients_per_million": value.icu_patients_per_million,
    "hosp_patients": value.hosp_patients,
    "hosp_patients_per_million": value.hosp_patients_per_million,
    "weekly_icu_admissions": value.weekly_icu_admissions,
    "weekly_icu_admissions_per_million": value.weekly_icu_admissions_per_million,
    "weekly_hosp_admissions": value.weekly_hosp_admissions,
    "weekly_hosp_admissions_per_million": value.weekly_hosp_admissions_per_million,
    "total_tests": value.total_tests,
    "new_tests": value.new_tests,
    "total_tests_per_thousand": value.total_tests_per_thousand,
    "new_tests_per_thousand": value.new_tests_per_thousand,
    "new_tests_smoothed": value.new_tests_smoothed,
    "new_tests_smoothed_per_thousand": value.new_tests_smoothed_per_thousand,
    "positive_rate": value.positive_rate,
    "tests_per_case": value.tests_per_case,
    "tests_units": value.tests_units,
    "total_vaccinations": value.total_vaccinations,
    "people_vaccinated": value.people_vaccinated,
    "people_fully_vaccinated": value.people_fully_vaccinated,
    "total_boosters": value.total_boosters,
    "new_vaccinations": value.new_vaccinations,
    "new_vaccinations_smoothed": value.new_vaccinations_smoothed,
    "total_vaccinations_per_hundred": value.total_vaccinations_per_hundred,
    "people_vaccinated_per_hundred": value.people_vaccinated_per_hundred,
    "people_fully_vaccinated_per_hundred": value.people_fully_vaccinated_per_hundred,
    "total_boosters_per_hundred": value.total_boosters_per_hundred,
    "new_vaccinations_smoothed_per_million": value.new_vaccinations_smoothed_per_million,
    "new_people_vaccinated_smoothed": value.new_people_vaccinated_smoothed,
    "new_people_vaccinated_smoothed_per_hundred": value.new_people_vaccinated_smoothed_per_hundred,
  }
}
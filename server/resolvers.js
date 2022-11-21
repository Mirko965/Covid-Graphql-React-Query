export const resolvers = {
  
  Query: {
    covidDataPerMonths: async (parent, arg, context, info) => {
      const result = await context.allCovidDataPerMonths()
      return result.map(data => data)
    },
    
    covidData: async (parent, arg, context, info) => {
      const result = await context.allCovidData(arg.country)
      return result.map(data => data)
    },
    
    countriesName: async (parent, arg, context, info) => {
      const result = await context.countriesName()
      return result.map(data => data)
    },
    countryDataPerMonthsByCountry: async (parent, arg, context, info) => {
      const result = await context.covidDataPerMonthsByCountry(arg.country)
      return result.map(data => data)
    }
  }
};

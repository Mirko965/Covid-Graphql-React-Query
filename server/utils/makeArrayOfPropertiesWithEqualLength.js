export const makeArrayOfPropertiesWithEqualLength =  (data,propertiesName) => {
  const arrayForProperty =  data.map(data => {
   
    const name = data.properties.name
    const countryData = data.properties.data.map(propertiesData => {
      const key = propertiesData.date
      const value = propertiesData[propertiesName]
      if(value=== undefined){
        return {[key]: null}
      }
      return ({[key]:Math.round(value)})
    })
    return {[name]:countryData}
  })
  
  const maxLength =  Math.max(...arrayForProperty.map(d => Object.values(d).flat().length))
  
  const arrayWithZero =  (array, maxLength) => {
    array.forEach(item => {
      for (const key in item) {
        let addZero = maxLength - (item[key].length)
        if (item[key].length < maxLength) {
          for (let i = 0; i < addZero; i++) {
            item[key].unshift({'': null})
          }
        }
      }
    })
    return array
  }
  return arrayWithZero(arrayForProperty, maxLength)
}


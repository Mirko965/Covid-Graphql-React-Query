export const addArrayToProperties = (data,props,name) => {
  return props.map(totalCasesPerMillionArray => {
    if(Object.keys(totalCasesPerMillionArray)[0] === data.properties.name){
      const arr = {[name]:Object.values(totalCasesPerMillionArray)[0]}
      const newProps = Object.assign(data.properties.array, arr)
      return Object.assign({},data, newProps)
    }
  })
}
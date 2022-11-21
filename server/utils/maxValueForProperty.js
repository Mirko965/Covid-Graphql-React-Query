export const maxValueForProperty = (dataProperty,name) => {   //TODO refactor
  const props = dataProperty.map(data => {
      return Object.values(data)
        .map(d => {
          const fd = d.map(c => {
            return Object.values(c)
          })
          return Math.max(...fd)
        })
    })
    .flat()
  return {[name]: Math.max(...props)}
}



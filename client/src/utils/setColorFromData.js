import {yeOrRe} from './color'

export const setColorFromData = (d) => {
  
  for (let i = 0; i < yeOrRe.length; i++) {
    if(d > ((i * 500) + 1) && d <= (i+1) * 500) {
      return Object.values(yeOrRe[i])[0]
    }
  }
  return "#f2f2f2"
}
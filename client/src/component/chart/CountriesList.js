import React from 'react';
import CheckBoxGroup from "../form/CheckBoxGroup";


export const CountriesList = ({onChange, data, loading, error, isChecked}) => {
  // console.log(checkedCountry.flat())
  if(loading) return <p>...loading</p>
  if(error) return <p>{error.toString()}</p>
  
  return (
    <React.StrictMode>
      <div>
        <div className={'countries-list'}>
            {data && data.covidDataPerMonths.map(d => {
              
              return (
                <div key={d.name} className='country-checkbox'>
                  {CheckBoxGroup(`${d.name}`, `${d.name}`, onChange)
                  }
                </div>
              )
            })}
        </div>
      </div>
    </React.StrictMode>
  
  )
}
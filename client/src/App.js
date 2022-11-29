import './App.css';
import {useQuery} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React, {useState} from 'react';
import {WorldMap} from "./component/map/WorldMap";
import {CountriesList} from "./component/chart/CountriesList";
import {Chart} from "./component/chart/Chart";
import {fetchData} from "./fetchData/fetchData";


const App = () => {
  const [isChecked, setIsChecked] = useState({});
  const [switches, setSwitches] = useState('map')
  
  const {loading, error, data} = useQuery(['world map'], () => fetchData)
  
  const onChange = (event) => {
    setIsChecked(prevState => {
      const checkedCountries = Object.assign({}, prevState, {[event.target.name]: event.target.checked})
      // eslint-disable-next-line array-callback-return
      const unCheckedCountries = Object.entries(checkedCountries).map(([key, value]) => {
        if (value === true) {
          return key
        }
      }).filter(d => d).map(d => ({[d]: true}))
      return Object.assign({}, ...unCheckedCountries)
    })
  }
  
  
  const handleMap = () => setSwitches('map')
  const handleLineChart = () => setSwitches('chart')
  
  return (
    
    <div className={switches === 'chart' ? 'App display-grid' : 'App'}>
      <div className={'chart-container'}>
        <div className={'switch-button'}>
          <button onClick={handleMap} className={switches === 'map' && 'active'}>Map</button>
          <button onClick={handleLineChart} className={switches === 'chart' && 'active'}>Chart</button>
        </div>
        {switches === 'map' && <WorldMap country={""} data={data} loading={loading} error={error}/>}
        {switches === 'chart' && <Chart data={data} loading={loading} error={error} countries={Object.keys(isChecked)}/>}
      </div>
      {switches === 'chart' && <CountriesList onChange={onChange} data={data} loading={loading} error={error}
      isChecked={Object.keys(isChecked)}/>}
      {switches === 'chart' && <ReactQueryDevtools/>}
    </div>
  );
}

export default App;

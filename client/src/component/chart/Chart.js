import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {QueryCache, useQuery} from '@tanstack/react-query';
import {isEmpty} from "../../utils/isEmpty";
import * as d3 from 'd3'
import {LineChart} from "./lineChart/LineChart";
import selectListGroup from "../form/SelectListGroup";
import {BarChart} from "./barChart/BarChart";
import {ColumnChart} from "./columnChart/ColumnChart";
import {XYAxis} from "./XYAxis";

export const Chart = ({countries, data, loading, error}) => {
  const [query, setQuery] = useState('total_deaths')
  const [activeIndex, setActiveIndex] = useState(null)
  const [switches, setSwitches] = useState('lineChart')
  
  const svgRef = useRef()
  
  const width = 1200;
  const height = 700;
  let yScaleLine
  let xScaleLine
  let xScaleBar
  let yScaleBar
  let xScaleColumn
  let yScaleColumn
  let line
  let xAxis
  let yAxis
  let dataForxScaleLine
  let dataForYScaleBar
  let groupDomain
  let newData
  let dataForColumnChart
  
  const margin = {top: 70, right: 130, bottom: 170, left: 100}
  
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const xAxisTickFormat = d3.timeFormat('%m/%y')
  const xValue = d => d.date
  const yValue = d => d[query];
  const yBarValue = d => d[query]
  let xValueColumn = d => d[query];
  let yValueColumn = d => d.country;
  
  
  const checkedCountry = data && data.covidDataPerMonths.flatMap(allData => {
    return countries.map(countryName => {
      if (countryName === allData.name) {
        return allData
      }
    })
  }).filter(d => d)
  
  const isData = (data) => {
    return !!((data && checkedCountry && checkedCountry.length > 0) || (data && checkedCountry > 0));
  }
  
  if (checkedCountry.length > 0) {
    
    newData = checkedCountry.map(d => {
      const name = d.name
      const data = d.data
        .map(d => {
          if (!isEmpty(d[query])) {
            return ({date: new Date(d.date), [query]: d[query]})
          } else {
            return ({date: new Date(d.date), [query]: 0})
          }
        }).filter(d => d)
      return {[name]: data}
    })
    
    dataForColumnChart = newData.flatMap(d => {
        return Object.entries(d).map(([key, value]) => {
          const country = key
          const data = value
          const maxData = (data[data.length - 1])[query]
          return {country, [query]: maxData}
        })
      })
      .sort((a, b) => b[query] - a[query])
    
    const lengthOfArray = newData.map(d => {
      return Object.values(d)[0].length
    })
    
    const indexOfArrayOfMaxLength = lengthOfArray.indexOf(Math.max(...lengthOfArray))
    
    dataForxScaleLine = Object.values(newData[indexOfArrayOfMaxLength])[0]
    
    const _maxOfDataValue = newData.flatMap(d => {
      const lastIndex = Object.values(d)[0].length - 1
      return (Object.values(d)[0][lastIndex])[query]
    })
    
    dataForYScaleBar = newData.map(d => {
      return Object.values(d)
    }).flat(2)
    
    const maxOfDataValue = Math.max(..._maxOfDataValue)
    
    xScaleLine = d3.scaleTime()
      .domain(d3.extent(dataForxScaleLine, xValue))
      .range([0, innerWidth])
      .nice()
    yScaleLine = d3.scaleLinear()
      .domain([0, maxOfDataValue])
      .range([innerHeight, 0])
      .nice()
    
    const yMax = d3.max(dataForYScaleBar, yBarValue)
    xScaleBar = d3.scaleTime()
      .domain([d3.min(dataForxScaleLine, d => d.date), d3.max(dataForxScaleLine, (d) => d.date)])
      .range([0, innerWidth])
      .nice()
    yScaleBar = d3.scaleLinear()
      .domain([0, yMax])
      .range([innerHeight, 0])
      .nice()
    
    xScaleColumn = d3.scaleLinear()
      .domain([0, d3.max(dataForColumnChart, xValueColumn)])
      .range([0, innerWidth]);
    yScaleColumn = d3.scaleBand()
      .domain(dataForColumnChart.map(yValueColumn))
      .range([0, innerHeight])
      .paddingInner(0.2)
    
    line = d3.line()
      .x(d => xScaleLine(xValue(d)))
      .y(d => yScaleLine(yValue(d)))
    
    xAxis = xScaleLine(xScaleLine.ticks(16)[0])
    yAxis = yScaleLine(yScaleLine.ticks()[0])
    
    
    let xScaleData = d3.scaleBand()
      .domain(Object.values(newData[0]).flat())
      .range([0, innerWidth])
      .padding(0.3)
    //console.log(Object.values(data[0]).flat())
    let domainData = newData.map(d => {
      return Object.keys(d)
    }).flat()
    
    groupDomain = Math.floor(xScaleData.bandwidth() / domainData.length)
    
  }
  
  
  const bisect = d3.bisector((d) => {
    return d.date
  }).center
  const handleMouseMove = (e) => {
    // d3.bisect(array, value, start, end)
    if (isData(data)) {
      const x0 = xScaleLine.invert(d3.pointer(e)[0])
      const index = bisect(dataForxScaleLine, x0, 1);
      // setXValue(d3.pointer(e)[0])
      setActiveIndex(index);
    }
    
  };
//console.log(activeIndex)
  const handleMouseLeave = () => {
    // setXValue(-500)
    setActiveIndex(null);
  };
  
  const color = d3.scaleOrdinal(d3.schemeCategory10)
  const lineChart = () => setSwitches('lineChart')
  const barChart = () => setSwitches('barChart')
  const columnChart = () => setSwitches('columnChart')
  
  const optionsList = ["Choose a queries", "total_deaths", "total_cases", "total_cases_per_million", "total_deaths_per_million"]
  const onChangeList = (event) => setQuery(() => event.target.value)
  
  if (loading) return <p>...loading</p>
  if (error) return <p>{error.toString()}</p>
  return (
    <React.StrictMode>
      <div className={'chart'}>
        <div className={'switch-button_chart'}>
          <button onClick={lineChart}>Line Chart</button>
          <button onClick={barChart}>Bar Chart</button>
          <button onClick={columnChart}>Column Chart</button>
        </div>
        <div>
          <div>
            {selectListGroup("cases", optionsList, onChangeList)}
          </div>
        </div>
        <div className={'svg'}>
          <svg
            ref={svgRef}
            viewBox={`${-margin.left} ${-margin.bottom} ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <g>
              <XYAxis
                xAxis={xAxis}
                innerHeight={innerHeight}
                innerWidth={innerWidth}
                isData={isData}
                data={newData}
                yScaleLine={yScaleLine}
                xScaleLine={xScaleLine}
                xAxisTickFormat={xAxisTickFormat}
                query={query}
                switches={switches}
                xScaleColumn={xScaleColumn}
                yScaleColumn={yScaleColumn}
              />
              
              <g className={'line'}>
                {switches === 'lineChart' && <LineChart
                  loading={loading}
                  error={error}
                  innerWidth={innerWidth}
                  innerHeight={innerHeight}
                  xValue={xValue}
                  isData={isData}
                  data={newData}
                  xScaleLine={xScaleLine}
                  yScaleLine={yScaleLine}
                  color={color}
                  line={line}
                  query={query}
                  activeIndex={activeIndex}
                />}
                {switches === 'barChart' && <BarChart
                  innerHeight={innerHeight}
                  isData={isData}
                  data={newData}
                  xScaleBar={xScaleBar}
                  yScaleBar={yScaleBar}
                  color={color}
                  query={query}
                  loading={loading}
                  error={error}
                  groupDomain={groupDomain}
                />}
                {
                  switches === 'columnChart' && <ColumnChart
                    loading={loading}
                    error={error}
                    data={dataForColumnChart}
                    isData={isData}
                    query={query}
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                    xScaleColumn={xScaleColumn}
                    yScaleColumn={yScaleColumn}
                    xValueColumn={xValueColumn}
                    yValueColumn={yValueColumn}
                  />
                }
              </g>
            </g>
          </svg>
        </div>
      
      </div>
    </React.StrictMode>
  
  )
}

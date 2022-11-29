import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useQuery, QueryCache } from '@tanstack/react-query';
import * as d3 from 'd3'
import useInterval from "../../utils/useInterval";
import {setColorFromData} from "../../utils/setColorFromData";
import {yeOrRe} from "../../utils/color";
import * as topojson from "topojson-client"
import countriesJson from '../../localDB/world-110m.json'

export const WorldMap = ({country, data, loading, error}) => {
  
  const [initialIndex, setInitialIndex] = useState(0)
  const [index, setIndex] = useState(initialIndex)
  const [isPlaying, setPlaying] = useState(false)
  
  const svgRef = useRef()
  
  const mapData = useMemo(() => {
    const {countries} = countriesJson.objects
    return topojson.feature(countriesJson, countries).features.filter(d => d.properties.name !== 'Antarctica')
  }, [])
  
  const width = useMemo(() => 960,[])
  const height = useMemo(() => 600,[])
  
  useEffect(() => {
    if(!loading && data) {
      setInitialIndex(data.covidDataPerMonths[0].data.length - 1)
    }
  },[data, loading])
  
  useEffect(() => {
    setIndex(initialIndex)
  },[initialIndex])
  
  useInterval(
    () => {
      if (index <= initialIndex-1) {
        setIndex(index + 1)
      } else {
        setPlaying(false)
      }
    },
    isPlaying ? 500 : null
  )
  const startPlaying = () => {
    if (index === initialIndex){
      setIndex(0)
    }
    setPlaying(!isPlaying)
  }
  const fillHandler = (worldMap) => {
    
    if(!loading && data){
      // eslint-disable-next-line array-callback-return
      return data.covidDataPerMonths.flatMap((feature) => {
        if(worldMap.id === feature.country_code){
          if(feature.data[index]){
            return setColorFromData(feature.data[index].total_deaths_per_million)
          }
        } else {
          return null
        }
      }).filter(d => d)
    }
  }
  
  
  const projection = d3.geoMercator()
    .scale(111)
    .translate([370, 370])
  const path = d3.geoPath(projection)
  
  let mapGroup
  let colorPaletteGroup
  
  if(svgRef.current){
    mapGroup = Array.from(svgRef.current.firstChild.children)
    colorPaletteGroup = Array.from(svgRef.current.lastChild.children)
  }
  
  const onMouseEnter = (data) => {
    if(data && !loading && !error)
      return (e) => {
        e.target.attributes.opacity.nodeValue = 1
        e.target.attributes.stroke.nodeValue = 'blue'
        
        // eslint-disable-next-line array-callback-return
        data.covidDataPerMonths.filter(d => {
          if(e.target.attributes.id && d.country_code === e.target.attributes.id.nodeValue){
            //console.log({country:d.country,"deaths per milion":Math.floor(d.data[index].total_deaths_per_million)})
          }
        })
        mapGroup && mapGroup.forEach(d => {
          e.target.attributes.fill.nodeValue === d.attributes.fill.nodeValue ?
            d.attributes.opacity.nodeValue = 1 :
            d.attributes.opacity.nodeValue = 0.3
        })
        
        colorPaletteGroup && colorPaletteGroup.forEach(d => {
          d.firstChild.attributes.fill.nodeValue === e.target.attributes.fill.nodeValue ?
            d.firstChild.attributes.opacity.nodeValue = 1 :
            d.firstChild.attributes.opacity.nodeValue = 0.3
        })
      }
  }
  
  const onMouseLeave = (e) => {
    e.target.attributes.opacity.nodeValue = 0.3
    e.target.attributes.stroke.nodeValue = 'black'
    mapGroup && mapGroup.forEach(d => d.attributes.opacity.nodeValue = 1)
    colorPaletteGroup && colorPaletteGroup.forEach(d => d.firstChild.attributes.opacity.nodeValue = 1)
  }
  return (
    <React.StrictMode>
      <div className={'map'}>
        <svg id={'worldMap'} ref={svgRef} viewBox='-300 0 1400 600'>
          <g>
            {mapData && mapData.map((feature, i) => {
              return (
                <path
                  id={feature.id}
                  key={(i + 1) * 0.876423}
                  d={path(feature.geometry)}
                  fill={data ? fillHandler(feature) : '#ffffe5'}
                  stroke={'black'}
                  className={feature.properties.name}
                  opacity={1}
                  onMouseEnter={onMouseEnter(data)}
                  onMouseLeave={onMouseLeave}
                />
              )
            })}
          </g>
      
          <g transform={`translate(50, ${height -50})`}>
            {yeOrRe.map((d,i) => {
              return(
                <g key={(i+1) * 34554}>
                  <rect
                    key={(i+1) * 345}
                    height={20}
                    width={50}
                    x={50 *i}
                    opacity={1}
                    stroke={'black'}
                    fill={ Object.values(yeOrRe[i]).toString()}
                    onMouseEnter={onMouseEnter(data)}
                    onMouseLeave={onMouseLeave}
                  />
                  <text
                    key={(i+1 )* 1.23}
                    transform={`translate(${50 * i}, 40)`}
                    textAnchor={'start'}
                  >
                    {Object.keys(yeOrRe[i]).toString()}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
        <div className='world-map-playbttn-wrapper'>
          <p>
            {data && data.covidDataPerMonths[7].data[index].date}
          </p>
          <button onClick={startPlaying}>{isPlaying ? 'pause' : 'play'}</button>
        </div>
      </div>
    </React.StrictMode>
  
  )
}
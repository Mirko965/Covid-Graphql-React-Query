import React from 'react';

import * as d3 from 'd3'


export const LineChart = ({
                            loading,
                            error,
                            innerWidth,
                            isData,
                            data,
                            xScaleLine,
                            yScaleLine,
                            color,
                            line,
                            query,
                            activeIndex,
  
                          }) => {
  const dateFormat = d3.timeFormat('%d-%m-%y')
  return (
    <React.StrictMode>
      <>
        
        {(!isData(data)) ?
          
          <text>Choose country</text>
          
          : data.map((country, index) => {
            
            const countryData = Object.values(country)[0]
            const countryName = Object.keys(country)[0]
            
            return (
              
              <g
                key={Math.random()}
                style={{fill: color(countryName), transition: "ease-out .5s"}}
              >
                <path
                  className={countryName}
                  fill="none"
                  stroke={color(countryName)}
                  strokeWidth={activeIndex ? 3 : 2}
                  opacity={activeIndex ? 1 : 0.3}
                  d={line(countryData)}
                  style={{transition: "ease-out .5s"}}
                />
                <text
                  fill={color(countryName)}
                  style={{'fontSize': "1.8em"}}
                  y={20+(40*index)}
                  x={30}
                >{countryName}
                </text>
                {countryData.map((d, i) => {
                  return (
                    <g key={i}>
                      <text
                        x={innerWidth/2}
                        style={{'fontSize': "1.5em"}}
                        fill={'black'}
                        textAnchor="middle"
                      >
                        {i === activeIndex ? `${dateFormat(d.date)}` : ""}
                      </text>
                      <text
                        fill="#666"
                        x={xScaleLine(d.date)}
                        y={yScaleLine(d[query]) - 20}
                        textAnchor="middle"
                      >
                        {i === activeIndex ? `${d[query]}` : ""}
                      </text>
                      <circle
                        cx={xScaleLine(d.date)}
                        cy={yScaleLine(d[query])}
                        r={i === activeIndex ? 5 : 0}
                        fill={color(countryName)}
                        strokeWidth={i === activeIndex ? 2 : 0}
                        //stroke="#fff"
                        //style={{ transition: "ease-out .5s" }}
                      />
                    
                    </g>
                  )
                })}
              </g>
            
            
            )
          })
          
        }
        
        
        {/*<VoronoiOverlay*/}
        {/*  //onHover={handleVoronoiHover}*/}
        {/*  innerHeight={innerHeight}*/}
        {/*  innerWidth={innerWidth}*/}
        {/*  newData={newData}*/}
        {/*  data={data}*/}
        {/*  onMouseEnter={onMouseEnter}*/}
        {/*  onMouseLeave={onMouseLeave}*/}
        {/*  xScale={xScale}*/}
        {/*  yScale={yScale}*/}
        {/*  xValue={xValue}*/}
        {/*  yValue={yValue}*/}
        {/*  isData={isData}*/}
        {/*  line={line}*/}
        {/*/>*/}
      
      </>
    </React.StrictMode>
  
  )
}

export const BarChart = ({
                           innerHeight,
                           isData,
                           data,
                           xScaleBar,
                           yScaleBar,
                           color,
                           query,
                           loading,
                           error,
                           groupDomain
                         }) => {
  
  return (
    <>
      {
        isData(data) && data.map((data, index) => {
          return Object.entries(data).map(([key, value], i) => {
              return (
                <>
                  <text
                    key={key}
                    fill={color(key)}
                    style={{'fontSize': "1.8em"}}
                    y={20+(40*index)}
                    x={30}
                  >
                    {key}
                  </text>
                  <g key={index} transform={`translate(${groupDomain * index})`}>
                    
                    {value.map((d, ind) => {
                      return (
                        <rect
                          key={ind}
                          style={{transition: "ease-in-out .5s"}}
                          className={'bar'}
                          x={xScaleBar(d.date)}
                          y={yScaleBar(d[query])}
                          width={groupDomain}
                          height={innerHeight - yScaleBar(d[query])}
                          fill={color(key)}
                        >
                          <title>{`${query}: ${d[query]}`}</title>
                        </rect>
                      )
                    })}
                  </g>
                </>
              
              )
              
            }
          )
        })
      }
    </>
  )
}
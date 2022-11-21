import * as d3 from 'd3'


export const VoronoiOverlay = ({innerWidth,innerHeight,data,xScale, yScale, xValue, yValue, isData,line, onHover, newData,onMouseEnter,onMouseLeave,points}) => {
  
  points = [[0,0],[0,0]]
  
  if(isData(data)){                               //TODO
     points = data && data.map((d, i) => {
      return Object.values(d).map(country => {
        return country.map(data =>  [xScale(xValue(data)), yScale(yValue(data))])
      })
    }).flat(2)
  }

  const voronoy = d3.Delaunay.from(points)
    .voronoi([0,0,innerWidth,innerHeight])

  return (
    <g>
      {newData.length > 0 && points.map((point,i,arr) => {
       console.log()
        return(
        <path
          key={i}
          className={newData[i].country}
          onMouseEnter={onMouseEnter(i)}
          onMouseLeave={onMouseLeave}
          d={voronoy.renderCell(i)}
          stroke={'lightgray'}
          strokeOpacity={1}
          strokeWidth={0.1}
          fill={'none'}
        />
      )})}
    </g>
  )
  
  
}
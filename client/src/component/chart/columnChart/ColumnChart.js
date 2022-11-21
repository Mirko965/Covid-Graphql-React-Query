import React from 'react'

export const ColumnChart = ({error, data, isData, query,xScaleColumn,yScaleColumn,xValueColumn,yValueColumn}) => {

  return (
    <>
      {isData(data) && data.map((d,i) => {
        
        return (
          <rect
            key={i}
            x={0}
            y={yScaleColumn(yValueColumn(d))}
            width={xScaleColumn(xValueColumn(d))}
            height={yScaleColumn.bandwidth()}
            fill={'red'}
          >
            <title>{`${query.toString().replaceAll('_', ' ')}:${d[query]}`}</title>
          </rect>
        )
      })
      }
      {error && <p>error:{error.message}</p>}
    </>
  )
}
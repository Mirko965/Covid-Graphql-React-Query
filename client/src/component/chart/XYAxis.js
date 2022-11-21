import React from 'react';
import numeral from 'numeral'

export const XYAxis = ({
                         xAxis,
                         innerHeight,
                         innerWidth,
                         isData,
                         data,
                         yScaleLine,
                         xScaleLine,
                         xAxisTickFormat,
                         switches,
                         xScaleColumn,
                         yScaleColumn,
                         query
                       }) => {
  const YAxis = () => {
    if (switches === 'lineChart' || switches === 'barChart') {
      return yScaleLine.ticks().map(tickValue => {
        return (
          <g key={tickValue}>
            <text
              x={-3}
              y={yScaleLine(tickValue)}
              dy={".32em"}
              style={{textAnchor: "end"}}
            >
              {numeral(tickValue).format('0a')}
            </text>
          </g>
        )
      })
    } else if (switches === 'columnChart') {
      return yScaleColumn.domain().map(tickValue => (
        <g className="tick">
          <text
            key={tickValue}
            style={{textAnchor: 'end'}}
            x={-3}
            dy=".32em"
            y={yScaleColumn(tickValue) + yScaleColumn.bandwidth() / 2}
          >
            {tickValue}
          </text>
        </g>
      ))
    }
  }
  const XAxis = () => {
    if ((switches === 'lineChart' || switches === 'barChart')) {
      return (
        xScaleLine.ticks(16).map((ticksValue, index) => {
          
          return (
            <g key={ticksValue} transform={`translate(${xScaleLine(ticksValue)},0)`}>
              <text
                y={innerHeight + 5}
                style={{textAnchor: "middle"}}
                dy={".71em"}
              >{xAxisTickFormat(ticksValue)}</text>
            </g>
          )
        })
      )
    } else if (switches === 'columnChart') {
      return (
        xScaleColumn.ticks().map(tickValue => {
            return (
              <g className="tick" key={tickValue} transform={`translate(${xScaleColumn(tickValue)},0)`}>
                <line y2={innerHeight}/>
                <text style={{textAnchor: 'middle'}} dy=".71em" y={innerHeight + 3}>
                  {numeral(tickValue).format('0a')}
                </text>
              </g>
            )
          }
        )
      )
    }
  }
  return (
    <g>
      <line
        x1={xAxis}
        y1={0}
        x2={xAxis}
        y2={innerHeight}
        stroke={'black'}
      />
      {isData(data) && YAxis()}
      <g>
        <line
          x1={0}
          y1={innerHeight}
          x2={innerWidth}
          y2={innerHeight}
          stroke="black"
        />
        {isData(data) && XAxis()}
        <text
          y={innerHeight + 50}
          x={innerWidth / 2}
          textAnchor="middle"
          style={{'fontSize': "1.5em"}}
        >
          {query.replaceAll('_', ' ').toUpperCase()}
        </text>
      </g>
    </g>
  )
}


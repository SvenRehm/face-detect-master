import React from "react"
import { Pie } from "@vx/shape"
import { Group } from "@vx/group"
import { GradientPinkBlue } from "@vx/gradient"

import "./ColorList.css"

const width = 500
const height = 500
const margin = { top: 20, bottom: 20, left: 20, right: 20 }

// Then we'll create some bounds

// We'll make some helpers to get at the data we want

const colorPercent = p => p.value
// Compose together the scale and accessor functions to get point functions

// Finally we'll embed it all in an SVG

function PieGraph({ colors }) {
   const radius = Math.min(width, height) / 2
   const centerY = height / 2
   const centerX = width / 2
   return (
      <svg width={width} height={height}>
         <Group top={centerY - margin.top} left={centerX}>
            <Pie
               data={colors}
               pieValue={colorPercent}
               pieSortValues={(a, b) => -1}
               outerRadius={radius - 90}
            >
               {pie => {
                  return pie.arcs.map((arc, i) => {
                     const opacity = 1 / i
                     const [centroidX, centroidY] = pie.path.centroid(arc)
                     return (
                        <g key={i}>
                           <path
                              d={pie.path(arc)}
                              fill={arc.data.raw_hex}
                              fillOpacity={opacity}
                           />
                           <text
                              fill="white"
                              textAnchor="middle"
                              //   verticalAnchor="middle"
                              x={centroidX}
                              y={centroidY - i * 3}
                              angle="52"
                              dy=".33em"
                              fontSize={12}
                           >
                              {arc.data.w3c.name}
                           </text>
                        </g>
                     )
                  })
               }}
            </Pie>
         </Group>
      </svg>
   )
}

export default PieGraph

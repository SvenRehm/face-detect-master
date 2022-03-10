import React from "react"
import PieGraph from "./pie"
import "./ColorList.css"

const ColorList = ({ colors }) => {
   const colorlist = colors.map(function(i, index) {
      return (
         <li
            className="color-list"
            key={index}
            style={
               i.w3c.name === "Black"
                  ? { color: "white", background: i.w3c.hex }
                  : { color: "black", background: i.w3c.hex }

               //     {
               //    background: i.w3c.hex
               // }
            }
         >
            <span className="left"> {i.w3c.hex}</span>
            {i.w3c.name}

            <span className="right"> {(i.value * 100).toFixed(2) + "%"}</span>
         </li>
      )
   })

   return (
      <div>
         <PieGraph colors={colors} />
         {/* <ul>{colorlist}</ul> */}
      </div>
   )
}

export default ColorList

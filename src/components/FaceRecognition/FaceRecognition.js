import React from "react"
import "./FaceRecognition.css"

const FaceRecognition = ({ imageUrl, box }) => {
   const boxes = box.map(function(i, index) {
      return (
         <div
            className="bounding-box"
            key={index}
            style={{
               top: i.topRow,
               right: i.rightCol,
               bottom: i.bottomRow,
               left: i.leftCol
            }}
         ></div>
      )
   })

   return (
      <div className="center ma">
         <div className="image mt2">
            <img
               id="inputimage"
               alt=""
               src={imageUrl}
               width="500px"
               heigh="auto"
            />
            {boxes}
         </div>
      </div>
   )
}

export default FaceRecognition

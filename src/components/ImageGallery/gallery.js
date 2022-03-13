import React, { Component } from "react"
// import ColorList from "../ColorList/ColorList"
import "./gallery.css"
class Gallery extends Component {
   constructor() {
      super()
      this.state = {}
   }

   componentDidMount() {
      this.props.fetchFaceDetectonLoad(this.props.images[0].picture, 0)
   }

   render() {
      const {
         currentImage,
         images,
         box,
         loading,

         fetchFaceDetectonLoad,
      } = this.props

      const allimages = images.map((i, key) => {
         return (
            <div
               key={key}
               className="column"
               style={{ width: `${100 / images.length}%` }}
            >
               <img
                  className="demo cursor"
                  src={i.picture}
                  style={{ width: "100%" }}
                  alt="face detect"
                  onClick={() => {
                     loading === false
                        ? fetchFaceDetectonLoad(images[key].picture, key)
                        : ""

                     // fetchColorDetect(images[key].picture, key)
                  }}
               />
            </div>
         )
      })

      const boxes = box.map(function (i, index) {
         return (
            <div
               className="face-bounding-box"
               key={index}
               style={{
                  top: i.topRow,
                  right: i.rightCol,
                  bottom: i.bottomRow,
                  left: i.leftCol,
               }}
            ></div>
         )
      })

      const allBigImages = images.map((i, key) => {
         return (
            <div
               key={key}
               className="mySlides"
               style={
                  currentImage === key
                     ? { display: "block", position: "relative" }
                     : null
               }
            >
               <img
                  id={currentImage === key ? "currentImage" : ""}
                  alt="asdad"
                  src={i.picture}
                  width="100%"
               />
               {/* {loading===false?boxes:""} */}
               {boxes}
            </div>
         )
      })
      // console.log(allBigImages)

      return (
         <div className="wrap">
            <div className="container">
               {/* <ColorList colors={this.props.colors} /> */}
               <div className="row">{allimages}</div>
               {allBigImages}
            </div>
         </div>
      )
   }
}

export default Gallery

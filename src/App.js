import React, { Component } from "react"
// import Particles from "react-particles-js"
// import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
// import Gallery from "./components/ImageGallery/ImageGallery"
import Gallery from "./components/ImageGallery/gallery"
// import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
// import ColorList from "./components/ColorList/ColorList"
// import ImageGallery from "react-image-gallery"
import "./App.css"

// const particlesOptions = {
//    particles: {
//       number: {
//          value: 70,
//          density: {
//             enable: true,
//             value_area: 1200
//          }
//       }
//    }
// }

const initialState = {
   loading: false,
   input: "",
   imageUrl: "",
   box: [],
   currentImage: 0,
   selected: "",
   colors: [],
   images: [
      {
         picture:
            "https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            box: [],
      },
      {
         picture:
            "https://images.unsplash.com/photo-1496840220025-4cbde0b9df65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            box: [],
      },
      {
         picture:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            box: [],
      },
      {
         picture:
            "https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
            box: [],
      },

      {
         picture:
            "https://images.unsplash.com/photo-1578894647686-3ea9a4d0deab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            box: [],
      },
      {
         picture:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            box: [],
      }
   ]
}


class App extends Component {
   constructor() {
      super()
      this.state = initialState
   }

  
   // _onSelect = option => {
   //    console.log("You selected ", option.label)
   //    this.setState({ selected: option })
   // }

   calculateFaceLocation = data => {
      const clarifaiFace = data.outputs[0].data.regions.map(
         i => i.region_info.bounding_box
      )

      const image = document.getElementById("currentImage")

      const width = Number(image.width)
      const height = Number(image.height)

      const box = clarifaiFace.map(i => {
         return {
            leftCol: i.left_col * width,
            topRow: i.top_row * height,
            rightCol: width - i.right_col * width,
            bottomRow: height - i.bottom_row * height
         }
      })
      return box
   }

   displayFaceBox = box => {
      this.setState({ box: box })
   }

   // displayFaceBox2 = box => {
   
   //    // this.setState({ box: box })
     
   //    var boxs={...this.state.images}
   //    boxs[this.state.currentImage].box=box
    
   //    this.setState({boxs})
     
   // }

   onInputChange = event => {
      this.setState({ input: event.target.value })
     
   }

   onButtonSubmit = () => {
      var checkforlink=this.state.input.match(/\.(jpeg|jpg|gif|png)$/)
      console.log(checkforlink)
      this.fetchFaceDetect(this.state.input, this.state.images.length)
     
   }

   fetchFaceDetect = (imageurl, key) => {
      this.setState({ currentImage: key })
      this.setState({ box: [], loading: true })
      
      fetch("https://git.heroku.com/face-detect-api-33.git/imageurl", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            input: imageurl
         })
      })
     
         .then(response => response.json())
         .then(response => {
            console.log(response)
            console.log("click")
            this.setState({ loading: false })
            this.onAddItem()
             this.displayFaceBox(this.calculateFaceLocation(response))
            // this.displayFaceBox2(this.calculateFaceLocation(response))
         })
      

         .catch(err => console.log(err))
      
   }

   fetchFaceDetectonLoad = (imageurl, key) => {
      this.setState({ currentImage: key })
      this.setState({ box: [], loading: true })
      
      fetch("https://git.heroku.com/face-detect-api-33.git/imageurl", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            input: imageurl
         })
      })
      
         .then(response => response.json())
         .then(response => {
          
            // console.log(response)
            this.setState({  loading: false })
             this.displayFaceBox(this.calculateFaceLocation(response))
            //  this.setState({ box: [], loading: false })
           
         })
         .catch(err => console.log(err))
   }
// COLOR DETECT LATER
   fetchColorDetect = (imageurl, key) => {
      this.setState({ currentImage: key })
      fetch("https://git.heroku.com/face-detect-api-33.git/color", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            input: imageurl
         })
      })
    
         .then(response => response.json())
         .then(response => {
            // console.log(response.outputs[0].data.colors)
            this.setState({ colors: response.outputs[0].data.colors })
            // this.onAddItem()
            // this.displayFaceBox(this.calculateFaceLocation(response))
         })
         .catch(err => console.log(err))
   }

   

   onAddItem = () => {
      this.setState(state => {
         const images = [...state.images, { picture: this.state.input }]
         return {
            images
         }
      })
   }

   render() {
      return (
         <div className="App">
            {/* {console.log(this.state.images[this.state.currentImage].box)} */}
            <div>
               <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                  // onSelect={this._onSelect}
               />
            
            </div>
            <Gallery
               imageUrl={this.state.imageUrl}
               input={this.state.input}
               currentImage={this.state.currentImage}
               images={this.state.images}
               box={this.state.box}
               loading={this.state.loading}
               // box2={ this.state.images[this.state.currentImage].box}
               fetchFaceDetect={this.fetchFaceDetect}
               fetchFaceDetectonLoad={this.fetchFaceDetectonLoad}
               fetchColorDetect={this.fetchColorDetect}
               colors={this.state.colors}
            />
            {/* <ColorList colors={this.state.colors} /> */}
         </div>
      )
   }
}

export default App

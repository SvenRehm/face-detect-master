import React from "react"
import "./ImageLinkForm.css"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onSelect }) => {
   const options = ["FaceDetect", "ColorDetect"]
   const defaultOption = options[0]
   return (
      <div>
         <p>"Copy an Image Link to find a face"</p>
         <div className="center">
            <div className="form center pa4  shadow-5">
               <input
                  className="f4 pa2 w-60 center"
                  type="tex"
                  onChange={onInputChange}
               />
               <button
                  className="submitbutton w-30 f4 link ph3 pv2 dib"
                  onClick={onButtonSubmit}
               >
                  Detect
               </button>
               {/* <Dropdown
                  options={options}
                  onChange={onSelect}
                  value={defaultOption}
                  placeholder="Select an option"
               /> */}
            </div>
         </div>
      </div>
   )
}

export default ImageLinkForm

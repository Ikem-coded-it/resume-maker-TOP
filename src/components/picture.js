import React, { useState } from "react";
import DefaultImage from "./image/download.png";
import "../styles/picture.css";

function PictureForm({ className, onSubmit }) {
  return (
    <form className= {className} onSubmit={onSubmit}>
      <input name="picture" className="file-input" type="file"/>
      <button>Upload</button>
    </form>
  )
}

export default function Profile() {
  const [src, setSrc] = useState(DefaultImage)
  const [editBtn, setEditBtn] = useState("picture-edit-btn-container")
  const [formClass, setFormClass] = useState("picture-form")

  const handleMouseOver = () => {
    setEditBtn("picture-edit-btn-container visible")
  }

  const handleMouseLeave = () => {
    setEditBtn("picture-edit-btn-container")
  }

  const handleClick = () => {
    if (formClass === "picture-form form-visible") {
      setFormClass("picture-form")
      return
    }
    setFormClass("picture-form form-visible")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target.picture.files[0];
    setSrc(URL.createObjectURL(file))
    setFormClass("picture-form");
  }
 
  return (
    <div 
      className="pic-resume-container"
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}>
        <div 
          className={ editBtn }
          onClick={handleClick}>
            <i className="fa-solid fa-plus"></i>
        </div>
        <div 
          className="pic-container">
            <img 
              className="img" 
              src={src} 
              alt="profile-pic"
            />
        </div>
        <h1 
          className="resume">
            Resume.
        </h1>
        <PictureForm 
          className={formClass} 
          onSubmit={handleSubmit}
        />
    </div>
  )
}
import React, { useState } from "react";
import "../styles/about.css";

function Form({ className, onSubmit }) {
  return(
    <form className={className} onSubmit={onSubmit}>
      <div className="text-area-container">
        <label htmlFor="about">Tell us a little  bit about you</label>
        <textarea name="about" maxLength={220}></textarea>
      </div>
      <div className="btn-container">
        <button type="submit">Edit</button>
      </div>
    </form>
  )
}

export default function About() {
  const [value, setValue] = useState("I'm a creative person who has worked as an art director for the last 3 years and as a studio lead for 2 years before that. I'm happy, friendly, and love a good challenge.")
  const [formClass, setFormClass] = useState("about-form")
  const [editBtn, setEditBtn] = useState("about-edit-btn-container")

  const handleMouseOver = () => {
    setEditBtn("about-edit-btn-container visible")
  }

  const handleMouseLeave = () => {
    setEditBtn("about-edit-btn-container") 
  }

  const handleClick = async() => {
    if (formClass === "about-form form-visible") {
      await setFormClass("about-form")
      return
    }
    await setFormClass("about-form form-visible")
  }

 const handleSubmit = (e) => {
    e.preventDefault()
    setValue(e.target.about.value)
    handleClick() // to close form
  }

  return (
    <div 
      className="about-section"
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}>
      <div className={ editBtn }
        onClick={handleClick}>
        <i className="fa-solid fa-edit"></i>
      </div>
      <h2 className="section-heading">About Me</h2>
      <p className="about-text">{value}</p>
      <Form 
        onSubmit={handleSubmit} 
        className={formClass} 
      />
    </div>
  )
} 
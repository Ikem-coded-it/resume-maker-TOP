import React, { useState } from "react";
import "../styles/basics.css";

function Form({onSubmit, className}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="form-name-container">
        <label htmlFor="name">Name</label>
        <input className="name-input" name="name" type="text" maxLength={20} />
      </div>
      <div className="form-title-container">
        <label htmlFor="title">Title</label>
        <input className="title-input" name="title" type="text" maxLength={25} />
      </div>
      <div className="form-phone-number-container">
        <label htmlFor="phone-number">Phone number</label>
        <input 
          className="phone-number-input" 
          name="phone" 
          type="text" 
          maxLength={11}
          minLength={11} 
        />
      </div>
      <div className="form-email-container">
          <label htmlFor="email">Email</label>
        <input className="email-input" name="email" type="email" />
      </div>
      <div className="form-btn-container">
        <button type="submit">Edit</button>
      </div>
    </form>
  )
}

export default function Basics() {
  const [display, setDisplay] = useState({
    name: "April Jones",
    title: "Art Director",
    phoneNumber: "08125456628",
    email: "april@gmail.com",
  })

  const [editBtn, setEditBtn] = useState("edit-btn-container")
  const [form, setForm] = useState("basics-form")

  const handleSubmit = (e) => {
    e.preventDefault()

    setDisplay({
      name: e.target.name.value,
      title: e.target.title.value,
      phoneNumber: e.target.phone.value,
      email: e.target.email.value,
    })

    handleClick() // to close form
  }
 
  const handleMouseOver = () => {
    setEditBtn("edit-btn-container visible");
  }  
  

  const handleMouseLeave = () => {
    setEditBtn("edit-btn-container");
  }
 

  const handleClick = () => {
    if (form === "basics-form form-visible") {
      setForm("basics-form")
      return
    }
    setForm("basics-form form-visible")
  }
 
  return (
    <div 
      className="basics-section" 
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}>
      <div className={ editBtn }
        onClick={handleClick}>
        <i className="fa-solid fa-edit"></i>
      </div>
      <div className="name-title">
        <h1 className="name">{display.name}</h1>
        <div className="title">{display.title}</div>
      </div>
      <div className="phone-email">
        <div>
          <i className="fa-solid fa-phone"></i>
          <p className="phone-number">{display.phoneNumber}</p>
        </div>
        <div>
          <i className="fa-solid fa-envelope"></i>
          <p className="email">{display.email}</p>
        </div>
      </div>
      <Form className={form} onSubmit={handleSubmit} />
    </div>
  )
};
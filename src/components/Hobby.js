import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import "../styles/hobby.css";

function HobbyForm ({ className, onSubmit }) {
    return (
      <form className={className} onSubmit={onSubmit}>
        <div 
          className="hobby-input-container">
          <label>Hobby</label>
          <input 
            type="text" 
            name="hobby" 
            maxLength={15} 
            required
          />
        </div>
        <div 
          className="btn-container">
          <button 
            type="submit">
              Add hobby
          </button>
        </div>
      </form>
    )
}

export default function Hobby () {
  const [hobbies, setHobbies] = useState([
    {key: uuidv4(), name: "reading"},
    {key: uuidv4(), name: "biking"},
  ])
  const [editBtn, setEditBtn] = useState("hobby-edit-btn-container")
  const [formClass, setFormClass] = useState("hobby-form")

  const handleMouseOver = async() => {
    await setEditBtn("hobby-edit-btn-container visible")
  }

  const handleMouseLeave = async() => {
    await setEditBtn("hobby-edit-btn-container")
  }

  const handleClick = (e) => {
    if (formClass === "hobby-form form-visible") {
      setFormClass("hobby-form")
      return
    }
    setFormClass("hobby-form form-visible")
  }

  const handleSubmit = async(e) => {
    e.preventDefault(e)
    if (hobbies.length >= 4) {
      alert("You've reached maximum for hobby.");
      return
    }
    
    const input = e.target.hobby.value

    await setHobbies([...hobbies, {key: uuidv4(), name: input}])
    e.target.hobby.value = '';
    
    await setFormClass("hobby-form");
  }

  const handleDelete = (e) => {
    const key = e.target.getAttribute("data-id");
    const newHobbies = hobbies.filter((hobby) => {
      if (hobby.key !== key) {
        return hobby;
      }  
    })
    setHobbies(newHobbies)
    return
  }
 
  return(
    <div 
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}
      className="hobby-section">
      <div 
        className={ editBtn }
        onClick={handleClick}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <h2>Hobbies</h2>
      <div 
        className="hobby-list">
        {hobbies.map((hobby, index) => {
          return(
            <div 
              key={hobby.key} 
              className="hobby-unit">
              <i 
                className="fa-regular fa-trash-can fa-trash-can-hobby" 
                data-id={hobby.key}
                onClick={handleDelete}
              ></i>
              <p>
                {hobby.name}
              </p>
            </div>
          )
        })}
      </div>
      <HobbyForm 
        className={formClass}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
import React, { useState } from "react";
import "../styles/education.css";
import {v4 as uuidv4} from "uuid";

function EducationUnits({ units, deleteUnit, edit }) {
  return (
    <div className="education-units-container">
      {
        units.map(unit => {
          return <div className="education-unit" key={unit.key}>
            <i 
              className="fa-regular fa-edit fa-edit-education" 
              onClick={edit} data-id={unit.key}>
            </i>
            <i 
              className="fa-regular fa-trash-can" 
              onClick={deleteUnit} 
              data-id={unit.key}
            ></i>
            <h3 
              className="institution-name">
                {unit.child.institution}
            </h3>
            <p 
              className="honors-title">
                {unit.child.honors}
            </p>
            <p 
              className="school-year">
                {unit.child.start.split('-')[0]} - {unit.child.end.split('-')[0]} {/**split to get year */}
              </p>
          </div>;
        })
      }
    </div>
  )
}

function EducationForm ({ className, onSubmit }) {
    return (
      <form className={className} onSubmit={onSubmit}>
        <div 
          className="institution-input-container">
            <label 
              htmlFor="institution">
                Institution
            </label>
            <input 
              type="text" 
              name="institution" 
              className="institution-name-input" 
              maxLength={30} 
              required/>
        </div>

        <div 
          className="honors-input-container">
            <label 
              htmlFor="honors">
                Honors
            </label>
          <input 
            type="text" 
            name="honors" 
            className="honors-name-input" 
            maxLength={30} 
            required/>
        </div>

        <div 
          className="school-year-input-container">
          <div>
            <label 
              htmlFor="start end">
                start
            </label>
            <input 
              type="date" 
              name="start" 
              className="start-date-input" 
              required/>
          </div>
          <div>
            <label 
              htmlFor="start end">
                end
            </label>
            <input 
              type="date" 
              name="end" 
              className="end-date-input" 
              required/>
          </div>
        </div>

        <div 
          className="btn-container">
            <button 
              type="submit" 
              id="education-form-btn">
                Add
            </button>
        </div>
      </form>
    )
}

export default function Education() {
  const [editBtn, setEditBtn] = useState("education-edit-btn-container")
  const [formClass, setFormClass] = useState("education-form")
  const [units, setUnits] = useState([
    {
      key: uuidv4(),
      child: {
        institution: "Nnamdi Azikiwe University",
        honors: "BSc Accountancy",
        start: "2018-11-01",
        end: "2022-06-01",
      }
    },
  ])
  const [form, setForm] = useState("new")
  const [currentEdit, setCurrentEdit] = useState("")

  const handleMouseOver = () => {
    setEditBtn("education-edit-btn-container visible")
  }

  const handleMouseLeave = () => {
    setEditBtn("education-edit-btn-container")
  }

  const handleClick = async(e) => {
    if (formClass === "education-form form-visible") {
      await setFormClass("education-form")
      return
    }
    await setFormClass("education-form form-visible")
  }

  const handleSubmit = async(e) => {
    e.preventDefault(e)
    if (units.length >= 3) {
      alert("You've reached maximum for education.");
      return
    }

    const input = {
      institution: e.target.institution.value,
      honors: e.target.honors.value,
      start: e.target.start.value,
      end: e.target.end.value,
    }

    await setUnits([
      ...units, 
      {
        key: uuidv4(), 
        child: input
      }
    ])

    e.target.institution.value = '';
    e.target.honors.value = '';
    e.target.start.value = '';
    e.target.end.value = '';

    await setFormClass("education-form");
  }

  const handleEdit = async(e) => {
    const editBtnNode = document.getElementById("education-form-btn");
    editBtnNode.innerText = "Edit"
    setFormClass("education-form form-visible")

    await setForm("edit")
    const schoolNameInput = document.getElementsByClassName("institution-name-input")[0]
    const honorsNameInput = document.getElementsByClassName("honors-name-input")[0]
    const startDateInput = document.getElementsByClassName("start-date-input")[0]
    const endDateInput = document.getElementsByClassName("end-date-input")[0]

    const key = e.target.getAttribute("data-id");
    units.forEach(async(unit) => {
      if (unit.key === key) {
        schoolNameInput.value = unit.child.institution
        honorsNameInput.value = unit.child.honors
        startDateInput.value = unit.child.start
        endDateInput.value = unit.child.end

        await setCurrentEdit(unit.key)
        schoolNameInput.focus()
        return;
      }  
    })
    console.log("here")
 }

 const finishEdit = async(e) => {
    e.preventDefault(e)

   const input = {
      institution: e.target.institution.value,
      honors: e.target.honors.value,
      start: e.target.start.value,
      end: e.target.end.value,
    }

    let oldUnitIndex;
    let oldUnitKey;
    units.forEach((unit, index) => {
      if (unit.key === currentEdit) {
        oldUnitIndex = index;
        oldUnitKey = unit.key
      }
    })

    const edit = {key: oldUnitKey, child: input}
    const newUnits = units.with(oldUnitIndex, edit) // replaces unit at index with new unit and returns new array
    await setUnits(newUnits)
    await setForm("new");

    e.target.institution.value = '';
    e.target.honors.value = '';
    e.target.start.value = '';
    e.target.end.value = '';

    await setFormClass("education-form");
    const editBtnNode = document.getElementById("education-form-btn");
    editBtnNode.innerText = "Add"
    return;
  }

  const handleDelete = (e) => {
    const key = e.target.getAttribute("data-id");
    const newUnits = units.filter((unit) => {
      if (unit.key !== key) {
        return unit;
      }  
    })
    setUnits(newUnits)
    return
  }
 
  return (
    <div 
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}
      className="education-section">
      <div className={ editBtn }
        onClick={handleClick}>
        <i className="fa-solid fa-plus"></i>
      </div>
      <h2 className="section-heading">Education</h2>
      <EducationUnits units={units} edit={handleEdit} deleteUnit={handleDelete}/>
      <EducationForm 
        className={formClass} 
        onSubmit={form === "new" ? handleSubmit : finishEdit}
      />
    </div>
  )
}
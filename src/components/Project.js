import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import "../styles/project.css";

function ProjectsContainer ({ projects, edit, deleteProject }) {
  return(
    <div className="project-container">
      {projects.map((project) => {
        return (
          <div 
            className="project-unit" 
            key={project.key}>
              <i 
                className="fa-regular fa-edit fa-edit-project" 
                onClick={edit} data-id={project.key}
              ></i>
              <i 
                className="fa-regular fa-trash-can fa-trash-can-project" 
                onClick={deleteProject} data-id={project.key}
              ></i>
              <h3 
                className="project-title">
                  {project.details.title}
              </h3>
              <p 
                className="project-description">
                  {project.details.description}
              </p>
          </div>
        )
      })}
    </div>
  )
}

function ProjectForm ({ className, onSubmit }) {
  return(
    <form 
      className={className} 
      onSubmit={onSubmit}>
      <div 
        className="title-input-container">
          <label 
            htmlFor="title">
              Title
          </label>
          <input 
            name="title" 
            type="text" 
            className="project-title-input" 
            maxLength={25} 
            required
          />
      </div>
      <div>
        <label 
          htmlFor="description">
            Description
        </label>
        <textarea 
          name="description" 
          className="project-description-input" 
          maxLength={150} 
          required
        ></textarea>
      </div>
      <div 
        className="btn-container">
          <button 
            type="submit" 
            id="project-form-btn">
              Add
          </button>
      </div>
    </form>
  )
}

export default function Project () {
  const [projects, setProjects] = useState([
    {
      key: uuidv4(),
      details: {
        title: "E-commerce site",
        description: "A good looking site for buying all kids of stuff. Made with HTML, CSS and JS. You're also able to search for specific products, like and add them to cart",
      }
    },
  ])
  const [formClass, setFormClass] = useState("project-form");
  const [editBtn, setEditBtn] = useState("project-edit-btn-container");
  const [form, setForm] = useState("new")
  const [currentEdit, setCurrentEdit] = useState("")

  const handleMouseOver = async() => {
    await setEditBtn("project-edit-btn-container visible")
  }

  const handleMouseLeave = async() => {
    await setEditBtn("project-edit-btn-container")
  }

  const handleClick = () => {
    if (formClass === "project-form form-visible") {
      setFormClass("project-form")
      return
    }
    setFormClass("project-form form-visible")
  }

  const handleSubmit = async(e) => {
    e.preventDefault(e)
    if (projects.length >= 3) {
      alert("You've reached maximum for projects.");
      return
    }

    const input = {
      title: e.target.title.value,
      description: e.target.description.value
    }

    await setProjects([...projects, {key: uuidv4(), details: input}])

    e.target.title.value = '';
    e.target.description.value = '';
    await setFormClass("project-form");
  }

  const handleEdit = async(e) => {
    const editBtnNode = document.getElementById("project-form-btn");
    editBtnNode.innerText = "Edit"
    await setFormClass("project-form form-visible")

    await setForm("edit")
    const projectTitleInput = document.getElementsByClassName("project-title-input")[0]
    const projectDescriptionInput = document.getElementsByClassName("project-description-input")[0]
    const key = e.target.getAttribute("data-id");
    projects.forEach(async(project) => {
      if (project.key === key) {
        projectTitleInput.value = project.details.title
        projectDescriptionInput.value = project.details.description
        await setCurrentEdit(project.key)
        projectTitleInput.focus()
        return;
      }  
    })
  }

  const finishEdit = async(e) => {
    e.preventDefault(e)
     
    const input = {
      title: e.target.title.value,
      description: e.target.description.value
    }

    let oldProjectIndex;
    let oldProjectKey;
    projects.forEach((project, index) => {
      if (project.key === currentEdit) {
        oldProjectIndex = index;
        oldProjectKey = project.key
      }
    })
    const edit = {key: oldProjectKey, details: input}
    const newProjects = projects.with(oldProjectIndex, edit) // replaces unit at index with new unit and returns new array
    await setProjects(newProjects)
    await setForm("new");

    e.target.title.value = '';
    e.target.description.value = '';
    await setFormClass("project-form");
    const editBtnNode = document.getElementById("project-form-btn");
    editBtnNode.innerText = "Add"
    return;
  }

  const handleDelete = (e) => {
    const key = e.target.getAttribute("data-id");
    const newProjects = projects.filter((project) => {
      if (project.key !== key) {
        return project;
      }  
    })
    setProjects(newProjects)
    return
  }
 
  return(
    <div
      onMouseEnter={handleMouseOver} 
      onMouseLeave={handleMouseLeave}
      className="projects-section">
        <div 
          className={ editBtn }
          onClick={handleClick}>
            <i className="fa-solid fa-plus"></i>
        </div>
        <h2>Projects.</h2>
        <ProjectsContainer 
          projects={projects}
          deleteProject={handleDelete}
          edit={handleEdit} 
        />
        <ProjectForm 
          className={formClass}
          onSubmit={form === "new" ? handleSubmit : finishEdit} 
        />
    </div>
  )
}
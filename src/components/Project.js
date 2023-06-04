import React, { Component } from "react";
import {v4 as uuidv4} from "uuid";
import "../styles/project.css";

class ProjectsContainer extends Component {
  render() {
    return(
      <div className="project-container">
        {this.props.projects.map((project) => {
          return <div className="project-unit" key={project.key}>
            <i className="fa-regular fa-edit fa-edit-project" onClick={this.props.edit} data-id={project.key}></i>
            <i className="fa-regular fa-trash-can fa-trash-can-project" onClick={this.props.delete} data-id={project.key}></i>
            <h3 className="project-title">{project.details.title}</h3>
            <p className="project-description">{project.details.description}</p>
          </div>
        })}
      </div>
    )
  }
}

class ProjectForm extends Component {
  render() {
    return(
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        <div className="title-input-container">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className="project-title-input" maxLength={25} required/>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" className="project-description-input" maxLength={150} required></textarea>
        </div>
        <div className="btn-container">
          <button type="submit" id="project-form-btn">Add</button>
        </div>
      </form>
    )
  }
}

export default class Project extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      projects: [
        {
          key: uuidv4(),
          details: {
            title: "E-commerce site",
            description: "A good looking site for buying all kids of stuff. Made with HTML, CSS and JS. You're also able to search for specific products, like and add them to cart",
          }
        },
      ],
      formClass: "project-form",
      editBtn: "project-edit-btn-container",
      form: "new",
      input: {
        title: "",
        description: "",
      },
      currentEdit: "",
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.finishEdit = this.finishEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "project-edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "project-edit-btn-container"
    })
  }

  handleClick() {
    if (this.state.formClass === "project-form form-visible") {
      this.setState({formClass: "project-form"})
      return
    }
    this.setState({formClass: "project-form form-visible"})
  }

  async handleSubmit(e) {
    e.preventDefault(e)
    if (this.state.projects.length >= 3) {
      alert("You've reached maximum for projects.");
      return
    }

    await this.setState({
      input: {
        title: e.target.title.value,
        description: e.target.description.value
      }
    })

    await this.setState({
      projects: [...this.state.projects, {key: uuidv4(), details: this.state.input}]
    })
    e.target.title.value = '';
    e.target.description.value = '';
    await this.setState({formClass: "project-form"});
  }

  handleEdit(e) {
    const editBtn = document.getElementById("project-form-btn");
    editBtn.innerText = "Edit"
    this.setState({
      formClass: "project-form form-visible"
    })

    this.setState({form: "edit"}, () => {
      const projectTitleInput = document.getElementsByClassName("project-title-input")[0]
      const projectDescriptionInput = document.getElementsByClassName("project-description-input")[0]
      const key = e.target.getAttribute("data-id");
      this.state.projects.forEach(project => {
        if (project.key === key) {
          projectTitleInput.value = project.details.title
          projectDescriptionInput.value = project.details.description
          this.setState({currentEdit: project.key}, () => {
            projectTitleInput.focus()
            return;
          })
        }  
      })
    });
  }

  async finishEdit(e) {
    e.preventDefault(e)
    let oldProjectIndex;
    let oldProjectKey;
    await this.setState({
      input: {
        title: e.target.title.value,
        description: e.target.description.value
      }
    })
    this.state.projects.forEach((project, index) => {
        if (project.key === this.state.currentEdit) {
          oldProjectIndex = index;
          oldProjectKey = project.key
        }
    })
    const edit = {key: oldProjectKey, details: this.state.input}
    const newProjects = this.state.projects.with(oldProjectIndex, edit) // replaces unit at index with new unit and returns new array
    await this.setState({projects: newProjects})
    await this.setState({form: "new"});

    e.target.title.value = '';
    e.target.description.value = '';
    await this.setState({formClass: "project-form"});
    const editBtn = document.getElementById("project-form-btn");
    editBtn.innerText = "Add"
    return;
  }

  handleDelete(e) {
    const key = e.target.getAttribute("data-id");
    const newProjects = this.state.projects.filter((project) => {
      if (project.key !== key) {
        return project;
      }  
    })
    this.setState({projects: newProjects})
    return
  }


  render() {
    return(
      <div
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}
        className="projects-section">
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <h2>Projects.</h2>
        <ProjectsContainer 
          projects={this.state.projects}
          delete={this.handleDelete}
          edit={this.handleEdit} 
        />
        <ProjectForm 
          className={this.state.formClass}
          onSubmit={this.state.form === "new" ? this.handleSubmit : this.finishEdit} 
        />
      </div>
    )
  }
}
import React, { Component } from "react";
import {v4 as uuidv4} from "uuid";
import "../styles/hobby.css";

class HobbyForm extends Component {
  render() {
    return (
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        <div className="hobby-input-container">
          <label>Hobby</label>
          <input type="text" name="hobby" maxLength={15} required/>
        </div>
        <div className="btn-container">
          <button type="submit">Add hobby</button>
        </div>
      </form>
    )
  }
}

export default class Hobby extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      hobbies: [
        {key: uuidv4(), name: "reading"},
        {key: uuidv4(), name: "biking"},
      ],
      editBtn: "hobby-edit-btn-container",
      formClass: "hobby-form",
      input: "",
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "hobby-edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "hobby-edit-btn-container"
    })
  }

  handleClick(e) {
    if (this.state.formClass === "hobby-form form-visible") {
      this.setState({formClass: "hobby-form"})
      return
    }
    this.setState({formClass: "hobby-form form-visible"})
  }

  async handleSubmit(e) {
    e.preventDefault(e)
    if (this.state.hobbies.length >= 4) {
      alert("You've reached maximum for hobby.");
      return
    }

    await this.setState({
      input: e.target.hobby.value, 
    })
    await this.setState({
      hobbies: [...this.state.hobbies, {key: uuidv4(), name: this.state.input}]
    })
    e.target.hobby.value = '';
    
    await this.setState({formClass: "hobby-form"});
  }

  handleDelete(e) {
    const key = e.target.getAttribute("data-id");
    const newHobbies = this.state.hobbies.filter((hobby) => {
      if (hobby.key !== key) {
        return hobby;
      }  
    })
    this.setState({hobbies: newHobbies})
    return
  }


  render() {
    return(
      <div 
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}
        className="hobby-section">
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <h2>Hobbies</h2>
        <div className="hobby-list">
          {this.state.hobbies.map((hobby, index) => {
            return <div key={hobby.key} className="hobby-unit">
              <i 
                className="fa-regular fa-trash-can fa-trash-can-hobby" 
                data-id={hobby.key}
                onClick={this.handleDelete}
              ></i>
              <p>{hobby.name}</p>
            </div>
          })}
        </div>
        <HobbyForm 
          className={this.state.formClass}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
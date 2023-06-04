import React, { Component } from "react";
import "../styles/picture.css";

class PictureForm extends Component {
  render() {
    return (
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        <input name="picture" className="file-input" type="file"/>
        <button>Upload</button>
      </form>
    )
  }
}

export default class Profile extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      src: "",
      editBtn: "picture-edit-btn-container",
      formClass: "picture-form",
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "picture-edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "picture-edit-btn-container"
    })
  }

  handleClick() {
    if (this.state.formClass === "picture-form form-visible") {
      this.setState({formClass: "picture-form"})
      return
    }
    this.setState({formClass: "picture-form form-visible"})
  }

  handleSubmit(e) {
    e.preventDefault()
    const file = e.target.picture.files[0];
    this.setState({src: URL.createObjectURL(file)})
    this.setState({formClass: "picture-form"});
  }

  render() {
    return (
      <div 
        className="pic-resume-container"
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}>
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="pic-container">
          <img className="img" src={this.state.src} alt="profile-pic"/>
        </div>
        <h1 className="resume">Resume.</h1>
        <PictureForm className={this.state.formClass} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}
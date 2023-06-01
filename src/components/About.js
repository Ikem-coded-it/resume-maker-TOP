import React, { Component } from "react";
import "../styles/about.css";

class Form extends Component {
  render() {
    return(
      <form className={this.props.className}>
        <div className="text-area-container">
          <label htmlFor="about">Tell us a little  bit about you</label>
          <textarea name="about" className="about-text">{this.props.value}</textarea>
        </div>
        <div className="btn-container">
          <button type="submit">Edit</button>
        </div>
      </form>
    )
  }
}

export default class About extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      value: "",
      form: "",
      editBtn: "edit-btn-container",
    };
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "edit-btn-container"
    })
  }

  render () {
    return (
      <div 
        className="about-section"
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}>
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-edit"></i>
        </div>
        <h2 className="section-heading">About Me</h2>
        <p className="about-text">{this.state.text}</p>
        <Form value={this.state.value} className={this.state.form} />
      </div>
    )
  }
} 
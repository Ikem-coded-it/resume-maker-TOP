import React, { Component } from "react";
import "../styles/about.css";

class Form extends Component {
  render() {
    return(
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
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
}

export default class About extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      input: "",
      value: "I'm a creative person who has worked as an art director for the last 3 years and as a studio lead for 2 years before that. I'm happy, friendly, and love a good challenge.",
      formClass: "about-form",
      editBtn: "about-edit-btn-container",
    };
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "about-edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "about-edit-btn-container"
    })
  }

  handleClick() {
    if (this.state.formClass === "about-form form-visible") {
      this.setState({formClass: "about-form"})
      return
    }
    this.setState({formClass: "about-form form-visible"})
  }

  async handleSubmit(e) {
    e.preventDefault()
    
    await this.setState({
      input: e.target.about.value
    })
 
    await this.setState({
      value: this.state.input
    })

    this.handleClick()
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
        <p className="about-text">{this.state.value}</p>
        <Form 
          onSubmit={this.handleSubmit} 
          className={this.state.formClass} 
        />
      </div>
    )
  }
} 
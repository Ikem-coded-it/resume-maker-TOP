import React, {Component} from "react";
import "../styles/basics.css";

class Form extends Component {
  render () {
    return (
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        <div className="form-name-container">
          <label htmlFor="name">Name</label>
          <input className="name-input" name="name" type="text" maxLength={20} />
        </div>
        <div className="form-title-container">
          <label htmlFor="title">Title</label>
          <input className="title-input" name="title" type="text" maxLength={15} />
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
}

export default class Basics extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      display: {
        name: "April Jones",
        title: "Art Director",
        phoneNumber: "08125456628",
        email: "april@gmail.com",
      },
      input: {
        name: "",
        title: "",
        phoneNumber: "",
        email: "",
      },
      editBtn: "edit-btn-container",
      form: "basics-form",
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    
    await this.setState({
      input: {
        name: e.target.name.value,
        title: e.target.title.value,
        phoneNumber: e.target.phone.value,
        email: e.target.email.value,
      }
    })
 
    await this.setState({
      display: {
        name: this.state.input.name,
        title: this.state.input.title,
        phoneNumber: this.state.input.phoneNumber,
        email: this.state.input.email,
      }
    })

    this.handleClick()
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

  handleClick() {
    if (this.state.form === "basics-form form-visible") {
      this.setState({form: "basics-form"})
      return
    }
    this.setState({form: "basics-form form-visible"})
  }

  render() {
    return (
      <div 
        className="basics-section" 
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}>
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-edit"></i>
        </div>
        <div className="name-title">
          <h1 className="name">{this.state.display.name}</h1>
          <div className="title">{this.state.display.title}</div>
        </div>
        <div className="phone-email">
          <div>
            <i className="fa-solid fa-phone"></i>
            <p className="phone-number">{this.state.display.phoneNumber}</p>
          </div>
          <div>
            <i className="fa-solid fa-envelope"></i>
            <p className="email">{this.state.display.email}</p>
          </div>
        </div>
        <Form className={this.state.form} onSubmit={this.handleSubmit} />
      </div>
    )
  }
};
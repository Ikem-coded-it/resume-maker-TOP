import React, {Component} from "react";
import "../styles/basics.css";

class Form extends Component {

  render () {
    return (
      <form className="basics-form">
        <div className="form-name-container">
          <label htmlFor="name">Name</label>
          <input className="name-input" name="name" type="text" />
        </div>
        <div className="form-title-container">
          <label htmlFor="title">Title</label>
          <input className="title-input" name="title" type="text" />
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
        name: "",
        title: "",
        phoneNumber: "",
        email: "",
      },
      input: {
        name: "",
        title: "",
        phoneNumber: "",
        email: "",
      }
    };
  }

  render() {
    return (
      <div className="basics-section">
        <div className="name-title">
          <h1 className="name">{this.state.name}</h1>
          <div className="title">{this.state.title}</div>
        </div>
        <div className="phone-email">
          <p className="phone-number">{this.state.phoneNumber}</p>
          <p className="email">{this.state.email}</p>
        </div>
        <Form />
      </div>
    )
  }
};
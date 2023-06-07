import React, { Component } from "react";
import "../styles/header.css";

export default class Header extends Component {
  render() {
    return(
      <header>
        <div className="page-title">
          <h1><span>Resume</span> Build</h1>
          <p>Best resume builder on the internet</p>
        </div>
        <p className="instructions">
          Hover over a section of the resume template for a pop up edit button.
          Click on the button to open a form for editing that section. Once you're
          done filling in the required information, click the "Edit" or "Add" button
          to add that piece of information to your resume.
        </p>
      </header>
    )
  }
}
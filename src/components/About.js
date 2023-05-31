import React, { Component } from "react";

export default class About extends Component {
  render () {
    return (
      <div className="about-section">
        <h2 className="section-heading">About Me</h2>
        <p className="about-text">{this.props.text}</p>
      </div>
    )
  }
} 
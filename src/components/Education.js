import React, { Component } from "react";

class EducationUnit extends Component {
  render() {
    return (
      <div className="education-unit">
        <p className="school-name">{this.props.schoolName}</p>
        <p className="degree-name">{this.props.degreeName}</p>
        <p className="school-year">{this.props.schoolYear}</p>
      </div>
    )
  }
}

export default class Education extends Component {
  render () {
    return (
      <div className="education-section">
        <h2 className="section-heading">Education</h2>
        <EducationUnit 
          schoolName={this.props.schoolName}
          degreeName={this.props.degreeName}
          schoolYear={this.props.schoolYear} 
        />
      </div>
    )
  }
}
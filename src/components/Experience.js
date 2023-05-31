import React, { Component } from "react";

class ExperienceUnit extends Component {
  render() {
    return (
      <div className="experience-unit">
        <p className="company-name">{this.props.companyName}</p>
        <p className="position-name">{this.props.positionName}</p>
        <p className="work-year">{this.props.workYear}</p>
      </div>
    )
  }
}

export default class Experience extends Component {
  render () {
    return (
      <div className="experience-section">
        <h2 className="section-heading">Experience</h2>
        <ExperienceUnit 
          companyName={this.props.companyName} 
          positionName={this.props.positionName}  
          workYear={this.props.workYear} 
        />
      </div>
    )
  }
}
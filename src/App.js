import React, {Component} from "react";
import About from "./components/About";
import Basics from "./components/Basics";
import Education from "./components/Education";
import Experience from "./components/Experience";
import "./App.css"
 
export default class App extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      basics: {
        name: "",
        title: "",
        phoneNumber: "",
        email: "",
      },
      about: {text: ""},
      education: {
        schoolName: "",
        degreeName: "",
        schoolYear: ""
      },
      experience: {
         companyName: "",
         positionName: "",
         workYear: "",
      },
    }
  }


  render() {
    return (
      <div className="template">
        <div className="left-side">
          <Basics 
            // name={this.state.basics.name}
            // title={this.state.basics.title}
            // phoneNumber={this.state.basics.phoneNumber} 
            // email={this.state.basics.email}
          />
          <About
            text={this.state.about.text}
          />
          <Education
            schoolName={this.state.education.schoolName}
            degreeName={this.state.education.degreeName}
            schoolYear={this.state.education.schoolYear} 
          />
          <Experience
            companyName={this.state.experience.companyName}
            positionName={this.state.experience.positionName}
            workYear={this.state.experience.workYear} 
          />
        </div>
        <div className="right-side">

        </div>
      </div>
    )
  }
}
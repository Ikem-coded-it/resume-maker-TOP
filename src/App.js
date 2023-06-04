import React, {Component} from "react";
import About from "./components/About";
import Basics from "./components/Basics";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Profile from "./components/picture";
import Projects from "./components/Project";
import "./App.css"
 
export default class App extends Component {
  render() {
    return (
      <div className="template">
        <div className="left-side">
          <Basics />
          <About />
          <Education />
          <Experience />
        </div>
        <div className="right-side">
          <Profile />
          <Projects />
        </div>
      </div>
    )
  }
}
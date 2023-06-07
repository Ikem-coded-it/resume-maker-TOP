import React, {Component} from "react";
import About from "./components/About";
import Basics from "./components/Basics";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Profile from "./components/picture";
import Projects from "./components/Project";
import Hobby from "./components/Hobby";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"
 
export default class App extends Component {
  constructor(prop) {
    super(prop)
    this.componentRef = null
  }


  render() {
    return (
      <div className="page">
        <Header />
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
            <Hobby />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
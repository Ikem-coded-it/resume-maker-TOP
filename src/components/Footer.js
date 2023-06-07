import React, { Component } from "react";
import "../styles/footer.css";

export default class Footer extends Component {
  render() {
    return(
      <footer>
        <p>
          Ikem-Coded-It {new Date().getFullYear()} 
          <a href="https://github.com/ikem-coded-it/resume-maker-top">
            <i className="fa-brands fa-github"></i>
          </a>
        </p>
      </footer>
    )
  }
}
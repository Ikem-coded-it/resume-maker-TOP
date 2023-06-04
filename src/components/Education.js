import React, { Component } from "react";
import "../styles/education.css";
import {v4 as uuidv4} from "uuid";

class EducationUnits extends Component {
  render() {
    return (
      <div className="education-units-container">
        {
          this.props.units.map(unit => {
            return <div className="education-unit" key={unit.key}>
              <i className="fa-regular fa-edit fa-edit-education" onClick={this.props.edit} data-id={unit.key}></i>
              <i className="fa-regular fa-trash-can" onClick={this.props.delete} data-id={unit.key}></i>
              <h3 className="institution-name">{unit.child.institution}</h3>
              <p className="honors-title">{unit.child.honors}</p>
              <p className="school-year">{unit.child.start.split('-')[0]} - {unit.child.end.split('-')[0]}</p> {/**split to get year */}
            </div>;
          })
        }
      </div>
    )
  }
}

class EducationForm extends Component {
  render() {
    return (
      <form className={this.props.className} onSubmit={this.props.onSubmit}>
        <div className="institution-input-container">
          <label htmlFor="institution">Institution</label>
          <input type="text" name="institution" className="institution-name-input" maxLength={30} required/>
        </div>
        <div className="honors-input-container">
          <label htmlFor="honors">Honors</label>
          <input type="text" name="honors" className="honors-name-input" maxLength={30} required/>
        </div>
        <div className="school-year-input-container">
          <div>
            <label htmlFor="start end">start</label>
            <input type="date" name="start" className="start-date-input" required/>
          </div>
          <div>
            <label htmlFor="start end">end</label>
            <input type="date" name="end" className="end-date-input" required/>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" id="education-form-btn">Add</button>
        </div>
      </form>
    )
  }
}

export default class Education extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      editBtn: "education-edit-btn-container",
      formClass: "education-form",
      input: {
        institution: "",
        honors: "",
        start: "",
        end: "",
      },
      units: [
        {
          key: uuidv4(),
          child: {
            institution: "Nnamdi Azikiwe University",
            honors: "BSc Accountancy",
            start: "2018-11-01",
            end: "2022-06-01",
          }
        },
      ],
      form: "new",
      currentEdit: "",
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.finishEdit = this.finishEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleMouseOver() {
    await this.setState({
      editBtn: "education-edit-btn-container visible"
    })
  }

  async handleMouseLeave() {
    await this.setState({
      editBtn: "education-edit-btn-container"
    })
  }

  handleClick(e) {
    if (this.state.formClass === "education-form form-visible") {
      this.setState({formClass: "education-form"})
      return
    }
    this.setState({formClass: "education-form form-visible"})
  }

  async handleSubmit(e) {
    e.preventDefault(e)
    if (this.state.units.length >= 3) {
      alert("You've reached maximum for education.");
      return
    }

    await this.setState({
      input: {
        institution: e.target.institution.value,
        honors: e.target.honors.value,
        start: e.target.start.value,
        end: e.target.end.value,
      }
    })

    await this.setState({
      units: [...this.state.units, {key: uuidv4(), child: this.state.input}]
    })
    e.target.institution.value = '';
    e.target.honors.value = '';
    e.target.start.value = '';
    e.target.end.value = '';
    await this.setState({formClass: "education-form"});
  }

  handleEdit(e) {
    const editBtn = document.getElementById("education-form-btn");
    editBtn.innerText = "Edit"
    this.setState({
      formClass: "education-form form-visible"
    })

    this.setState({form: "edit"}, () => {
      const schoolNameInput = document.getElementsByClassName("institution-name-input")[0]
      const honorsNameInput = document.getElementsByClassName("honors-name-input")[0]
      const startDateInput = document.getElementsByClassName("start-date-input")[0]
      const endDateInput = document.getElementsByClassName("end-date-input")[0]
      const key = e.target.getAttribute("data-id");
      this.state.units.forEach(unit => {
        if (unit.key === key) {
          schoolNameInput.value = unit.child.institution
          honorsNameInput.value = unit.child.honors
          startDateInput.value = unit.child.start
          endDateInput.value = unit.child.end
          this.setState({currentEdit: unit.key}, () => {
            schoolNameInput.focus()
            return;
          })
        }  
      })
    });
  }

  async finishEdit(e) {
    e.preventDefault(e)
    let oldUnitIndex;
    let oldUnitKey;
    await this.setState({
      input: {
        institution: e.target.institution.value,
        honors: e.target.honors.value,
        start: e.target.start.value,
        end: e.target.end.value,
      }
    })
    this.state.units.forEach((unit, index) => {
        if (unit.key === this.state.currentEdit) {
          oldUnitIndex = index;
          oldUnitKey = unit.key
        }
    })
    const edit = {key: oldUnitKey, child: this.state.input}
    const newUnits = this.state.units.with(oldUnitIndex, edit) // replaces unit at index with new unit and returns new array
    await this.setState({units: newUnits})
    await this.setState({form: "new"});

    e.target.institution.value = '';
    e.target.honors.value = '';
    e.target.start.value = '';
    e.target.end.value = '';
    await this.setState({formClass: "education-form"});
    const editBtn = document.getElementById("education-form-btn");
    editBtn.innerText = "Add"
    return;
  }

  handleDelete(e) {
    const key = e.target.getAttribute("data-id");
    const newUnits = this.state.units.filter((unit) => {
      if (unit.key !== key) {
        return unit;
      }  
    })
    this.setState({units: newUnits})
    return
  }

  render () {
    return (
      <div 
        onMouseEnter={this.handleMouseOver} 
        onMouseLeave={this.handleMouseLeave}
        className="education-section">
        <div className={ this.state.editBtn }
          onClick={this.handleClick}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <h2 className="section-heading">Education</h2>
        <EducationUnits units={this.state.units} edit={this.handleEdit} delete={this.handleDelete}/>
        <EducationForm 
          className={this.state.formClass} 
          onSubmit={this.state.form === "new" ? this.handleSubmit : this.finishEdit}
        />
      </div>
    )
  }
}
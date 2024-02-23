import React, { Component } from "react";
import './Class.css'

export default class ClassInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      inputVal: "",
      editIndex: -1,
      isEdit: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    //if this is an edit don't add another element just amend
    if (this.state.isEdit) {
        this.setState((state) => {
            const updatedTodos = [...state.todos]
            updatedTodos[this.state.editIndex] = state.inputVal
            return {todos: updatedTodos, inputVal: '', isEdit: false, editIndex: -1 }
        })
    } else {
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: "",
        }))
    }
  }

  handleEdit(index) {
   this.setState({
    editIndex: index,
    isEdit: true,
    inputVal: this.state.todos[index]
   })
  }

  handleDelete(index) {
    this.setState((state) => ({
        todos: state.todos.filter((_, i) => i !== index),
    }))
  }

  renderTodoItem(todo, index) {
    if (this.state.editIndex === index) {
      return (
        <div key={index}> {/* Key moved here for proper use */}
          <input
            type="text"
            id={`task-entry-${index}`} // Unique ID for each task entry
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </div>
      );
    } else {
      return (
        <li key={index} className="listItem">
         <span className="todoTxt"> {todo}</span>
          <div className="btnDiv">
            <button className="editDeleteBtn" type="button" onClick={() => this.handleEdit(index)}>✏️</button>
            <button className="editDeleteBtn" type="button" onClick={() => this.handleDelete(index)}>❌</button>
          </div>
        </li>
      );
    }
  }
  
  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
         {!this.state.isEdit && 
            <>
                <label htmlFor="task-entry">Enter a task: </label>
                <input
                    type="text"
                    name="task-entry"
                    value={this.state.inputVal}
                    onChange={this.handleInputChange}
                />
                <button type="submit">Submit</button>
            </>
        }
          
        </form>
        <h4> {this.state.todos.length > 0 && `Tasks remaining: ${this.state.todos.length}`}</h4>
        <ul className="listDiv">
          {this.state.todos.map((todo, index) => this.renderTodoItem(todo, index))}
        </ul>
      </section>
    );
  }
}

// ✏️ Pencil (Unicode: U+270F) - This is a classic symbol for editing.
// 📝 Memo (Unicode: U+1F4DD) - Often used to represent notes or tasks, which can imply editing.
// ✍️ Writing Hand (Unicode: U+270D) - Signifies writing or editing content.
// 🔧 Wrench (Unicode: U+1F527) - Sometimes used to represent settings or adjustments, which can loosely imply editing or modifying.
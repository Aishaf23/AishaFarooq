import React, { Component } from "react";

class TodoItem extends Component {
  render() {
    const { todo, index, checkTodo, deleteTodo } = this.props;
    return (
      <li key={todo.id} id={todo.id} className="liTask col-12 col-t-12">
        <input
          type="checkbox"
          className="chkTodo"
          onChange={(event) => checkTodo(todo, index, event)}
          checked={todo.completed}
        />
        <span className={"taskValue " + (todo.completed ? "completed" : "")}>
          {todo.title}{" "}
        </span>
        <input
          type="button"
          className="btnDelete"
          value="Delete"
          onClick={(event) => deleteTodo(index, event.target.parentNode.id)}
        />
      </li>
    );
  }
}

export default TodoItem;

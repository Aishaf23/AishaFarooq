import React, { Component } from "react";
import RemainingTodos from "./remainingTodos";

class CheckAllTodos extends Component {
  render() {
    const { checkAllTodos, anyRemaining, remaining } = this.props;
    return (
      <div className="allTodos col-10 col-t-10">
        <input
          type="checkbox"
          className="todo-input"
          onChange={checkAllTodos}
          checked={anyRemaining}
        />
        <span className="todo-item-label"> Check All </span>
        <RemainingTodos remaining={remaining} />
      </div>
    );
  }
}

export default CheckAllTodos;

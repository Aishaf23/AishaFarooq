import React, { Component } from "react";
import ClearCompletedTodos from "./clearCompletedTodos";

class FilterTodos extends Component {
  render() {
    const {
      filter,
      updateFilter,
      todosCompletedCount,
      clearCompleted,
    } = this.props;
    return (
      <div className="choicesFilter col-10 col-t-10">
        <button
          className={"btnChoice " + (filter === "all" ? "active" : "")}
          value="All"
          onClick={() => updateFilter("all")}
        >
          All
        </button>
        <button
          className={"btnChoice " + (filter === "active" ? "active" : "")}
          value="active"
          onClick={() => updateFilter("active")}
        >
          Active
        </button>
        <button
          className={"btnChoice " + (filter === "completed" ? "active" : "")}
          value="completed"
          onClick={() => updateFilter("completed")}
        >
          Completed
        </button>
        <ClearCompletedTodos
          todosCompletedCount={todosCompletedCount}
          clearCompleted={clearCompleted}
        />
      </div>
    );
  }
}

export default FilterTodos;

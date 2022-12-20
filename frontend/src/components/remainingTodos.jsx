import React, { Component } from "react";

class RemainingTodos extends Component {
  render() {
    return (
      <span className="allTasksLeft"> {this.props.remaining} items left</span>
    );
  }
}

export default RemainingTodos;

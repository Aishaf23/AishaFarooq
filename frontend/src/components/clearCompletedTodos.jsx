import React, { Component } from "react";

class ClearCompletedTodos extends Component {
  render() {
    const { todosCompletedCount, clearCompleted } = this.props;

    return (
      <React.Fragment>
        {todosCompletedCount() > 0 && (
          <button className="btnClear" value="clear" onClick={clearCompleted}>
            Clear Completed
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default ClearCompletedTodos;

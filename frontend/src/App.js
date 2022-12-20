 import React, { Component } from "react";
import "./App.css";
import CheckAllTodos from "./components/checkAllTodos";
import TodoItem from "./components/todoItem";
import FilterTodos from "./components/filterTodos";
import axios from "axios";

class App extends Component {
  state = {
    filter: "all",
    todos: [],
  };
  render() {
    return (
      <div className="App col-8 col-t-8">
        <div className="divInput col-10 col-t-10">
          <input
            type="text"
            className="todo-input"
            placeholder="What I need to do..."
            ref={this.todoInput}
            onKeyUp={this.addTodo}
          />
        </div>
        <div className="main col-12 col-t-12">
          <div className="tasks-left col-12 col-t12">
            <ul className="col-10 col-t-10">
              {this.todosFiltered().map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  checkTodo={this.checkTodo}
                  deleteTodo={this.deleteTodo}
                />
              ))}
            </ul>
            <div className="allTasks col-12 col-t-12">
              <CheckAllTodos
                checkAllTodos={this.checkAllTodos}
                anyRemaining={this.anyRemaining()}
                remaining={this.remaining()}
              />
            </div>
            <FilterTodos
              updateFilter={this.updateFilter}
              filter={this.state.filter}
              todosCompletedCount={this.todosCompletedCount}
              clearCompleted={this.clearCompleted}
            />
          </div>
        </div>
      </div>
    );
  }

  todoInput = React.createRef();

  addTodo = (event) => {
    if (event.key === "Enter") {
      const todoInput = this.todoInput.current.value;
      if (todoInput.trim().length === 0) {
        return;
      }

      axios
        .post("http://localhost:8080/saveToDB.php", {
          task: todoInput,
          completed: false,
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.setState((prevState, props) => {
            let todos = prevState.todos;
            todos.push({
              id: data[0].id,
              title: data[0].text,
              completed: false,
            });
            return {
              todos,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.todoInput.current.value = "";
    }
  };

  deleteTodo = (index, id) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      axios
        .post("http://localhost:8080/flagInDB.php", {
          id: id,
        })
        .then()
        .catch((err) => {
          console.log(err);
        });

      todos.splice(index, 1);

      return {
        todos,
      };
    });
  };

  checkTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      axios
        .post("http://localhost:8080/markAsCompleted.php", {
          id: todo.id,
        })
        .then()
        .catch((err) => {
          console.log(err);
        });

      todo.completed = !todo.completed;
      todos.splice(index, 1, todo);
      return {
        todos,
      };
    });
  };

  remaining = () => {
    return this.state.todos.filter((todo) => !todo.completed).length;
  };

  anyRemaining = () => {
    return this.remaining() === 0;
  };

  todosCompletedCount = () => {
    return this.state.todos.filter((todo) => todo.completed).length;
  };

  clearCompleted = () => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos = todos.filter((todo) => !todo.completed);
      axios
        .post("http://localhost:8080/clearCompleted.php")
        .then()
        .catch((err) => {
          console.log(err);
        });

      return { todos };
    });
  };

  updateFilter = (filter) => {
    this.setState({ filter });
  };

  todosFiltered = () => {
    console.log(this.state.filter, "test");
    if (this.state.filter === "all") {
      return this.state.todos;
    } else if (this.state.filter === "active") {
      return this.state.todos.filter((todo) => !todo.completed);
    } else if (this.state.filter === "completed") {
      return this.state.todos.filter((todo) => todo.completed);
    }
    return this.state.todos;
  };

  checkAllTodos = (event) => {
    event.persist();
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.forEach((todo) => {
        todo.completed = event.target.checked;
      });

      axios
        .post("http://localhost:8080/markAllAsCompleted.php", {
          completed: event.target.checked,
        })
        .then()
        .catch((err) => {
          console.log(err);
        });

      return { todos };
    });
  };

  readTasks = () => {
    axios
      .get("http://localhost:8080/readTasks.php")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        this.setState((prevState, props) => {
          let todos = prevState.todos;
          data.forEach((task) => {
            todos.push({
              id: task.id,
              title: task.text,
              completed: task.done === "0" ? false : true,
            });
          });
          return {
            todos,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.readTasks();
  }
}

export default App;

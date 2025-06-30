import React from "react";
import "../src/Todo.css";
import { useState } from "react";
import axios from "axios";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);


  const addTodo = async () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }
    const newTodo = {
      userId: 1,
      id: Date.now(),
      title: task,
      completed: false,
    };
    try {
      await axios.post("http://localhost:8000/addTodos", newTodo);
      setTodos((prev) => [...prev, newTodo]);
      setTask("");
    } catch (error) {
      console.error("Can't Add Todos");
    }
  };  

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Can't Delete Todo");
    }
  };

  const updateTodo = async (id, updatedTitle) => {
    try {
      const response = await axios.patch(`http://localhost:8000/update/${id}`, {
        title: updatedTitle,
        completed: false,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        )
      );
    } catch (error) {
      console.error("Can't Update Todo");
    }
  }
  const handleUpdate = (id) => {
    const updatedTitle = prompt("Enter new title:");
    if (updatedTitle) {
      updateTodo(id, updatedTitle);
    }
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <br />
      <div className="input-section">
        <h5>Task:-</h5>{" "}
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <br />
        <br />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <br />
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <button onClick={() => handleUpdate(todo.id)}>✍🏻</button>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

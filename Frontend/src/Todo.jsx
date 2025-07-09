import React, { useState } from "react";
import axios from "axios";
import "../src/Todo.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [todos, setTodos] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);

  const addTodo = async () => {
    if (!task) return alert("Please enter a task");
    const newTodo = {
      userId: 1,
      id: Date.now(),
      title: task,
      completed: false,
      priority,
    };
    try {
      await axios.post("http://localhost:8000/addTodos", newTodo);
      setTodos((prev) => [...prev, newTodo]);
      setTask("");
      setPriority("Medium");
    } catch (err) {
      console.error("Can't Add Todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Can't Delete Todo");
    }
  };

  const updateTodo = async () => {
    try {
      await axios.patch(`http://localhost:8000/update/${editId}`, {
        title: editTitle,
        priority: editPriority,
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId
            ? { ...todo, title: editTitle, priority: editPriority }
            : todo
        )
      );
      setEditModal(false);
    } catch (err) {
      console.error("Can't Update Todo");
    }
  };

  const openEditModal = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditPriority(todo.priority || "Medium");
    setEditModal(true);
  };

  return (
    <div className="todo-container" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Todo App</h2>

      {/* Add Task Section */}
      <div
        className="input-section"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "30px auto",
        }}
      >
        <div>
          <label><strong>Task:</strong></label>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <div>
          <label><strong>Priority:</strong></label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          onClick={addTodo}
          style={{
            backgroundColor: "#28c745",
            color: "#fff",
            padding: "10px 0",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>{todo.title}</strong>
              <p style={{ margin: "5px 0", color: "#555" }}>
                Priority: <strong>{todo.priority || "Medium"}</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => openEditModal(todo)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: "#ffc107",
                  border: "none",
                  fontSize: "16px",
                }}
              >
                ✍🏻
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: "#dc3545",
                  border: "none",
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Custom Update Modal */}
      {editModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setEditModal(false)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#ccc",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={updateTodo}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;

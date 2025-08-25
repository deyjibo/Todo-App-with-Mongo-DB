import React, { useState, useEffect } from "react";
import "./Todo.css";
import axios from "axios";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Base URL from environment variable
  const BASE_URL = process.env.REACT_APP_API + "/todos";

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, [BASE_URL]);

  // Handle form submission to add a new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    try {
      const response = await axios.post(BASE_URL, { text: task });
      setTodos([...todos, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle the completed state of a todo
  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo from the list and the database
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task here"
          className="todo-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="todo-button">
          Add
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span onClick={() => toggleComplete(todo._id)}>{todo.text}</span>
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo._id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

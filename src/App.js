import { useState } from "react";

import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";
import { motion } from "framer-motion"
import './App.css';
import ToDoList from './component/ToDoList';


function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });

  const toastConfig = {
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: bounce,
    autoClose: 1000,
    hideProgressBar: true,
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([{ id: `${todo}- ${Date.now()}`, todo }, ...todos]);
      setTodo("");
      toast.success('Task added successfully', toastConfig)
    } else {
      toast.error('please add Task', toastConfig)
    }

    if (editId) {
      // find the li todo id that match.
      const editToDo = todos.find((todo) => todo.id === editId)

      // return new todos array with the updated todo
      const updatedTodos = todos.map((newUpdatedTodo) =>
        newUpdatedTodo.id === editToDo.id ?
          (newUpdatedTodo = { id: newUpdatedTodo.id, todo }) :
          { id: newUpdatedTodo.id, todo: newUpdatedTodo.todo }
      )
      setTodos(updatedTodos)
      setEditId(0)
      setTodo("")
      toast.info('Task updated successfully', toastConfig)

      return
    }
  }

  const handleDelete = (id) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos([...deletedTodo]);
  }

  // this function take the value from the todo.id and show the value on the input
  const handleUpdate = (id) => {
    // find todo id and return it
    const updateTodo = todos.find((todo) => todo.id === id)
    // setTodo(updateTodo.todo)
    setEditId(id);
    setTodo(updateTodo.todo)
  }

  return (
    <>
      <ToastContainer />
      <div className="App">
        <div className="container">
          <h1>Todo List</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type='submit'>{editId ? 'Edit' : 'Add'}</button>
          </form>
          <ToDoList todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;

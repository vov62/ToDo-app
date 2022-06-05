import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';

const ToDoList = ({ todos, handleUpdate, handleDelete }) => {


    return (
        <>
            <ul className='toDosUl' >
                {todos && todos.length > 0 ?
                    (todos.map((todos, i) => (
                        <li key={i} className='singleToDo'>
                            <span className='toDoText'>{todos.todo}</span>
                            <FiEdit2 onClick={() => handleUpdate(todos.id)} />
                            <BsTrash onClick={() => handleDelete(todos.id)} />
                        </li>
                    ))) : (
                        <div>
                            <h4>No Todos</h4>
                        </div>
                    )
                }
            </ul>

        </>
    )
}

export default ToDoList
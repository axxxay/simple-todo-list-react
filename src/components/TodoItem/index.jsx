import {FaArrowUpWideShort} from 'react-icons/fa6'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'
import { useState } from 'react'
import Popup from 'reactjs-popup'
import './style.css'

const TodoItem = ({todoDetails, deleteTodoItem, toggleCompletion, updateTodoItem}) => {
    const {todo, id, priority, isComplete} = todoDetails;
    const [todoName, setTodoName] = useState(todo);

    const onClickDelete = () => {
        deleteTodoItem(id)
    }

    const onClickCheckbox = () => {
        toggleCompletion(id)
    }

    const onUpdateTodo = (event) => {
        setTodoName(event.target.value)
    }

    const onClickUpdate = () => {
        if (todoName !== "") {
            updateTodoItem(id, todoName)
        }
    }

    return (
        <li className='todo-item'>
            <div className='todo-info-con' >
                <input type='checkbox' id={id} checked={isComplete} onChange={onClickCheckbox} className='todo-checkbox' />
                <label className={`${isComplete && 'todo-complete'} todo-name`} htmlFor={id}>{todo}</label>
            </div>
            <div className='delete-priority-con'>

                <Popup
                    modal
                    trigger={
                    <button type="button" className="trigger-button">
                        <AiOutlineEdit className='edit-icon' />
                    </button>
                    }
                >
                    {close => (
                        <>
                            <div className='edit-con'>
                                <h1 className='edit-heading'>Edit Todo</h1>
                                <input type='text' className='edit-input' value={todoName} onChange={onUpdateTodo} placeholder='Edit todo...' />
                                <button
                                    type="button"
                                    className="modal-trigger-button"
                                    onClick={() => {onClickUpdate(); close()} }
                                >
                                    Update
                                </button>
                            </div>
                        </>
                    )}
                </Popup>

                <div className="vertical-line"></div>
                <FaArrowUpWideShort className={`${priority === "Low" ? "priority-icon-low" : priority === "Medium" ? "priority-icon-medium" : ""} priority-icon`} />
                <div className="vertical-line"></div>
                <button type='button' onClick={onClickDelete} className='delete-todo-button'>
                    <RiDeleteBin6Line className='delete-icon'/>
                </button>
            </div>
        </li>
    )
}

export default TodoItem
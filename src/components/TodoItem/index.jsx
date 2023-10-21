import {FaArrowUpWideShort} from 'react-icons/fa6'
import {RiDeleteBin6Line} from 'react-icons/ri'
import './style.css'

const TodoItem = ({todoDetails, deleteTodoItem, toggleCompletion}) => {
    const {todo, id, priority, isComplete} = todoDetails;

    const onClickDelete = () => {
        deleteTodoItem(id)
    }

    const onClickCheckbox = () => {
        toggleCompletion(id)
    }

    return (
        <li className='todo-item'>
            <div className='todo-info-con' >
                <input type='checkbox' id={id} checked={isComplete} onChange={onClickCheckbox} className='todo-checkbox' />
                <label className={`${isComplete && 'todo-complete'} todo-name`} htmlFor={id}>{todo}</label>
            </div>
            <div className='delete-priority-con'>
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
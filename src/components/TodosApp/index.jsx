import {HiMiniPencilSquare} from 'react-icons/hi2'
import { v4 as uuid } from 'uuid'
import Header from "../Header"
import './style.css'
import TodoItem from '../TodoItem'
import { useEffect, useState } from 'react'


const TodoApp = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("")
    const [priority, setPriority] = useState("High")
    const [filteredTodoList, setFilteredTodoList] = useState([])

    const onChangeInput = (event) => {
        setTodo(event.target.value)
    }

    const onChangePriority = (event) => {
        setPriority(event.target.value)
    }

    const addTodoItem = () => {
        if(todo !== "") {
            const newTodo = {
                id: uuid(),
                todo,
                priority,
                isComplete: false
            }
            setTodoList([...todoList, newTodo])
            setTodo("");
        }
    }

    const deleteTodoItem = (id) => {
        const updatedTodoList = todoList.filter(eachItem => eachItem.id !== id);
        setTodoList(updatedTodoList);
    }

    const toggleCompletion = (id) => {
        let updatedTodoList = []
        for(let each of todoList){
            if(each.id === id){
                each.isComplete = !each.isComplete
            }
            updatedTodoList.push(each)
        }
        setTodoList(updatedTodoList);
    }

    useEffect(() => {
        setFilteredTodoList(todoList)
    }, [todoList])
    
    let filteredTodo = []
    const sortByCompletion = (event) => {
        if (event.target.value === "Completed") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === true)
            setFilteredTodoList(filteredTodo)
        } else if (event.target.value === "Incomplete") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === false)
            setFilteredTodoList(filteredTodo)
        } else if (event.target.value === "All") {
            filteredTodo = todoList
            setFilteredTodoList(filteredTodo)
        }
    }

    const sortByPriority = (event) => {
        if (event.target.value === "High") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'High')
            setFilteredTodoList(filteredTodo)
        } else if (event.target.value === "Medium") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'Medium')
            setFilteredTodoList(filteredTodo)
        } else if (event.target.value === "Low") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'Low')
            setFilteredTodoList(filteredTodo)
        } else {
            setFilteredTodoList(todoList)
        }
    }

    return (
        <>
            <Header />
            <div className="todo-app-container">
                <div className="todo-add-container">
                    <div className='input-container'>
                        <HiMiniPencilSquare className='todo-icon' />
                        <input type='text' className='input-box' value={todo} onChange={onChangeInput} placeholder='What needs to be done...' />
                    </div>
                    <div className='button-priority-con'>
                        <p className='priority-label'>Priority</p>
                        <select className='priority-container' value={priority} onChange={onChangePriority}>
                            <option className='priority' value="High">High</option>
                            <option className='priority' value="Medium">Medium</option>
                            <option className='priority' value="Low">Low</option>
                        </select>
                        <button type='button' className='add-todo-button' onClick={addTodoItem}>Add Todo</button>
                    </div>
                </div>
                <div className='tasks-sort-con'>
                    <h1 className='tasks-heading'>Tasks</h1>
                    <div className='sort-con'>
                        <div className='sort-sub-con'>
                            <p className='sort-heading'>Filter by</p>
                            <select className='sort-container' onChange={sortByCompletion}>
                                <option className='sort' value="All">All</option>
                                <option className='sort' value="Completed">Completed</option>
                                <option className='sort' value="Incomplete">Incomplete</option>
                            </select>
                        </div>
                        <div className='sort-sub-con'>
                        <p className='sort-heading'>Sort priority</p>
                            <select className='sort-container' onChange={sortByPriority}>
                                <option className='sort' value="">Select</option>
                                <option className='sort' value="High">High</option>
                                <option className='sort' value="Medium">Medium</option>
                                <option className='sort' value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr className='line'/>
                <ul className='todo-list'>
                    {filteredTodoList.map(eachItem => <TodoItem key={eachItem.id} deleteTodoItem={deleteTodoItem} toggleCompletion={toggleCompletion} todoDetails={eachItem} />)}
                </ul>
                
            </div>
        </>
    )
}

export default TodoApp
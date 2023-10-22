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
    const [sortBy, setSortBy] = useState("All")
    const [sortByPriority, setSortByPriority] = useState("")

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
            setPriority("High");
        }
    }

    const updateTodoItem = (id, todo) => {
        const updatedTodoList = todoList.map(eachItem => {
            if(eachItem.id === id){
                eachItem.todo = todo
            }
            return eachItem
        })
        setTodoList(updatedTodoList);
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

    const onChangeSortByPriority = (event) => {
        setSortByPriority(event.target.value)
        sortByCompletionAndPriority(sortBy, event.target.value)
    }

    const onChangeSortBy = (event) => {
        setSortBy(event.target.value)
        sortByCompletionAndPriority(event.target.value, sortByPriority)

    }

    let filteredTodo = []
    const sortByCompletionAndPriority = (sortBy, sortByPriority ) => {
        if (sortBy === "All" && sortByPriority === "") {
            filteredTodo = todoList
        }else if (sortBy === "All" && sortByPriority === "High") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'High')
        } else if (sortBy === "All" && sortByPriority === "Medium") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'Medium')
        } else if (sortBy === "All" && sortByPriority === "Low") {
            filteredTodo = todoList.filter(eachItem => eachItem.priority === 'Low')
        } if (sortBy === "Completed" && sortByPriority === "") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === true)
        } else if (sortBy === "Completed" && sortByPriority === "High") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === true && eachItem.priority === 'High')
        } else if (sortBy === "Completed" && sortByPriority === "Medium") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === true && eachItem.priority === 'Medium')
        } else if (sortBy === "Completed" && sortByPriority === "Low") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === true && eachItem.priority === 'Low')
        } else if (sortBy === "Incomplete" && sortByPriority === "") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === false)
        } else if (sortBy === "Incomplete" && sortByPriority === "High") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === false && eachItem.priority === 'High')
        } else if (sortBy === "Incomplete" && sortByPriority === "Medium") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === false && eachItem.priority === 'Medium')
        } else if (sortBy === "Incomplete" && sortByPriority === "Low") {
            filteredTodo = todoList.filter(eachItem => eachItem.isComplete === false && eachItem.priority === 'Low')
        }
        setFilteredTodoList(filteredTodo)
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
                            <select className='sort-container' onChange={onChangeSortBy}>
                                <option className='sort' value="All">All</option>
                                <option className='sort' value="Completed">Completed</option>
                                <option className='sort' value="Incomplete">Incomplete</option>
                            </select>
                        </div>
                        <div className='sort-sub-con'>
                        <p className='sort-heading'>Sort priority</p>
                            <select className='sort-container' onChange={onChangeSortByPriority}>
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
                    {
                        todoList.length === 0 && <div className='task-image-con'>
                            <img src='/task-image.jpg' className='task-image' alt='todo' />
                            <h1 className='task-text'>Your Tasks goes here...</h1>
                        </div>
                    }
                    {filteredTodoList.map(eachItem => <TodoItem key={eachItem.id} updateTodoItem={updateTodoItem} deleteTodoItem={deleteTodoItem} toggleCompletion={toggleCompletion} todoDetails={eachItem} />)}
                </ul>
                
            </div>
        </>
    )
}

export default TodoApp
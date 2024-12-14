import { useState } from 'react'
import { TaskCard } from '../TaskCard/TaskCard'
import './Form.css'

export const Form = () => {

    // USE STATE (setList) 
    const prueba = () => {
        if (window.localStorage.getItem('list')) {
            return JSON.parse(window.localStorage.getItem('list'))
        } else {
            return []
        }
    }

    // TASKS STATES
    const [list , setList] = useState(prueba())
    const [task , setTask] = useState('')

    // FUNCTION TO ADD A TASK
    const addTask = () => {

        if (task.length > 0) {
            const taskToAdd = {
                id: Math.random().toString(36).substr(2, 9) ,
                title: task,
                status: 'incomplete',
            }
            setList([...list , taskToAdd])
            setTask('')
            window.localStorage.setItem('list' , JSON.stringify([...list , taskToAdd]))
        }
    }

    // FUNCTION TO REMOVE TASK
    const removeTask = (id) => {
        const newList = list.filter((task) => task.id !== id)
        setList(newList)
        window.localStorage.setItem('list' , JSON.stringify(newList))
    }

    // COMPLETE TASK
    const completeTask = (id) => {
        const updatedList = list.map((task) => {
            if (task.id === id) {
                return {...task , status: 'complete'}
            } else {
                return task
            }
        })
        setList(updatedList)
        window.localStorage.setItem('list' , JSON.stringify(updatedList))
    }    

    // COMPLETE TASK
    const incompleteTask = (id) => {
        const updatedList = list.map((task) => {
            if (task.id === id) {
                return {...task , status: 'incomplete'}
            } else {
                return task
            }
        })
        setList(updatedList)
        window.localStorage.setItem('list' , JSON.stringify(updatedList))
    }  

    // CLEAR TASKS 
    const clearTasks = () => {
        window.localStorage.clear()
        setList([])
    }
    
  return (
    <form action="" className="form" onSubmit={e => e.preventDefault()}>
        <div className="title">
            <h1>To Do List</h1>
        </div>
        <div className="input">
            <input type="text" name="" id="" placeholder='📝 type a task' value={task} onChange={e => setTask(e.target.value)}/>
            <button onClick={() => addTask()}>ADD TASK</button>
        </div>
        <div className="stats">
            <div className="complete-tasks" onClick={() => {console.log(list)}}>
                <h3>Complete: {list.filter((task) => task.status === 'complete').length}</h3>
            </div>
            <div className="incomplete-tasks">
                <h3>Incomplete: {list.filter((task) => task.status === 'incomplete').length}</h3>
            </div>
            <button onClick={() => clearTasks()}>CLEAR TASKS</button>
        </div>
        <div className="tasks-list">
        {list.map((taska) => {
                return <TaskCard key={taska.id} title={taska.title} id={taska.id} removeTask={removeTask} completeTask={completeTask} incompleteTask={incompleteTask} status={taska.status}></TaskCard>
            })}
        </div>
    </form>
  )
}

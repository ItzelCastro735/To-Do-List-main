import React from 'react'
import './TaskCard.css'

export const TaskCard = ({id , title , removeTask , completeTask , status , incompleteTask}) => {

  return (
    <div className="taskCard">
        {status === 'complete' ? <p style={{textDecoration: 'line-through 2px green'}}>{title.toUpperCase()}</p> : <p>{title.toUpperCase()}</p>}
        <div className="icons">
            <p onClick={() => removeTask(id)}>🗑️</p>
            {status === 'complete' ? <p onClick={() => incompleteTask(id)}>✅</p> : <p onClick={() => completeTask(id)}>✔️</p>}
        </div>
    </div>
  )
}

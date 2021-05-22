import React from 'react'
import { FaTimes } from 'react-icons/fa'

function Activity({ activity, onDelete }) {
    return (
        <div>
            <h3>{activity.activity} <FaTimes 
            style={{ color: 'red', cursor: 'pointer' }} 
            onClick={() => onDelete(activity.id)}
            /></h3>
            <p>{activity.time} </p>
            <p>{activity.member1}</p>
            <p>{activity.member2}</p>
            <p>{activity.member3}</p>
            <p>{activity.member4}</p>
        </div>
    )
}

export default Activity

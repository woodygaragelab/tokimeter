import React from 'react'

function Activity({activity}) {
    return (
        <div>
            <h3>{activity.activity}</h3>
            <p>{activity.time} </p>
            <p>{activity.member1}</p>
            <p>{activity.member2}</p>
            <p>{activity.member3}</p>
            <p>{activity.member4}</p>
        </div>
    )
}

export default Activity

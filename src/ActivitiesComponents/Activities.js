import React from 'react'
import { act } from 'react-dom/test-utils'
import Activity from './Activity'

function Activities({activities,onDelete}) {
    return (
        <>
            {activities.map((activity,index) => (
                <Activity key={index} activity={activity} onDelete={onDelete}/>
            )
            )}
        </>
    )
}

export default Activities

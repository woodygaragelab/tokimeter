import React from 'react'
import Button from './Button'

function ActivityHeader() {
    return (
       <header>
           <h1>{"イベント"}</h1>
           <Button color={'lightgrey'} text={'追加'} />
       </header>
    )
}

export default ActivityHeader

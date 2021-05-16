import React from 'react'
import Button from './Button'

function ActivityHeader(props) {
    return (
       <header>
           <h1>{"イベント"}</h1>
           <Button color={props.showAdd ? 'pink':'lightgrey'} 
           text={props.showAdd ? '閉じる':'追加'} 
           onClick={props.onClick}/>
       </header>
    )
}

export default ActivityHeader

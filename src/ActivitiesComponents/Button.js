import { propTypes } from 'react-bootstrap/esm/Image'
import React from 'react'

function Button({ color, text, onClick }) {
    return (
    <div className="text-right">
    <button
        onClick={onClick}
        style={{ backgroundColor: color }} className='btn'>
        {text}
    </button>
    </div>
    )
}


export default Button

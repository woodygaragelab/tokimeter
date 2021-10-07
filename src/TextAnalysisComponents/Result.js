import React from 'react'
import { FaTimes } from 'react-icons/fa'

//ユーザーと脈アリ点数だけ表示させる
function Result({result,onDelete}) {
    return (
        <div>
            <h3>{result.name} <FaTimes 
            style={{ color: 'red', cursor: 'pointer' }} 
            onClick={() => onDelete(result.id)}
            /></h3>
            {/* <p>{result.text}</p>
            <p>{result.excite}</p>
            <p>{result.pleasant}</p>
            <p>{result.calm}</p>
            <p>{result.nervous}</p>
            <p>{result.boring}</p>
            <p>{result.unpleasant}</p>
            <p>{result.surprise}</p>
            <p>{result.sleepy}</p> */}
            <p>{result.myakuari}</p>
        </div>
    )
}

export default Result

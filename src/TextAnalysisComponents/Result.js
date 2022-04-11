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
            {/* 脈アリの値のみ表示させる */}
            <p>名前:{result.Name}</p>
            <p>会話内容：{result.TextContent}</p>
            <p>excite:{result.excite}</p>
            <p>pleasant:{result.pleasant}</p>
            <p>calm:{result.calm}</p>
            <p>nervous:{result.nervous}</p>
            <p>boring: {result.boring}</p>
            <p>unpleasant: {result.unpleasant}</p>
            <p>surprise: {result.surprise}</p>
            <p>sleepy: {result.sleepy}</p>
            <p>MYAKUARI: {result.myakuari}</p>
        </div>
    )
}

export default Result

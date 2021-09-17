import React from 'react'

function Result({result}) {
    return (
        <div>
            <h3>{result.name}</h3>
            <p>{result.text}</p>
            <p>{result.excite}</p>
            <p>{result.pleasant}</p>
            <p>{result.calm}</p>
            <p>{result.nervous}</p>
            <p>{result.boring}</p>
            <p>{result.unpleasant}</p>
            <p>{result.surprise}</p>
            <p>{result.sleepy}</p>
            <p>{result.myakuari}</p>
        </div>
    )
}

export default Result

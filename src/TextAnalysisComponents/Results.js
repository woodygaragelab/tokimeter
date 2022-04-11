import { text } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import Result from './Result'

function Results({results}) {
    return (
        <>
         {results.map((result,index)=>(
             <Result key={index} result={result}/>
         ))}
        </>
    )
}

export default Results

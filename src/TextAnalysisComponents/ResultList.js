import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import {addAnalysisResult} from './AddAnalysisResult';
import Results from './Results';


const ResultList = ({ userName, chatContent, koziproResult }) => {

    const [analysisResults, setAnalysisResult] = useState([])

   
    useEffect(() => {
        const getResults = async () => {
            const resultsFromServer = await fetchResults()
            setAnalysisResult(resultsFromServer)
        }

        getResults()
    }, [])
   

    //分析結果をサーバーから取得
    const fetchResults = async () => {
        const res = await fetch('http://localhost:5200/analysisResults')
        const data = await res.json()

        return data
     
        
    }

    


    //新規の分析結果をサーバーに保存
    const addResult = async (analysisResult) => {
        const res_add = await fetch('http://localhost:5200/activities', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(analysisResult),
        })

        const data = await res_add.json()
        setAnalysisResult([...analysisResults, data])

    }


    return (
       <div>
           <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
        
        <Results results={analysisResults}/>
       </div>
    )
}

export default withRouter(ResultList)

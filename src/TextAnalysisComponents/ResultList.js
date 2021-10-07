import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import {addAnalysisResult} from './AddAnalysisResult';
import Results from './Results';
import Result from './Result'


const ResultList = () => {

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

      // 分析結果の削除 
  const deleteResult = async (id) => {
      alert("削除しましょうか？")
    await fetch(`http://localhost:5200/analysisResults/${id}`, {
      method: 'DELETE',
    })

    //  削除されたid以外のイベントのみを表示する
    setAnalysisResult(analysisResults.filter((analysisResult) => analysisResult.id !== id))

  }

    return (
       <div>
           <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
        
        {/* <Results results={analysisResults}/> */}
        {analysisResults.map((result,index)=>(
             <Result key={index} result={result} onDelete={deleteResult}/>
         ))}
        
       </div>
    )
}

export default withRouter(ResultList)

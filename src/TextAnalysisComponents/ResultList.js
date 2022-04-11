import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { addAnalysisResult } from './AddAnalysisResult';
import Results from './Results';
import Result from './Result'
import Amplify,{API,graphqlOperation} from 'aws-amplify'
import {listTextAnalysisResults} from '../graphql/queries';
import { deleteTextAnalysisResult } from '../graphql/mutations';


const ResultList = () => {

    const [analysisResults, setAnalysisResult] = useState([])

    useEffect(() => {
        fetchAnalysisResult()
      }, [])

    // fetch results by graphQL
    const fetchAnalysisResult = async () => {
        try {
          const analysisResultData = await API.graphql(graphqlOperation(listTextAnalysisResults))
          const analysisResultList = analysisResultData.data.listTextAnalysisResults.items
          console.log('text analysis results list',analysisResultList)
          setAnalysisResult(analysisResultList)
        } catch (error) {
          console.log('error on fetching text analysis result',error);
        }
      }

    // 分析結果の削除 
    const removeAnalysisResult = async (id) =>{
        const resultId = id
        const isDelete = window.confirm('分析結果を削除しましょうか。')
        if(isDelete){
            const analysisResultId = {
                id: resultId,
            };

            await API.graphql(graphqlOperation(deleteTextAnalysisResult,{input: analysisResultId}))
            fetchAnalysisResult();

        }
        
    }

    return (
        <div>
            <div className="kzHeader kzColor1 kzFont1">Kozipro</div>

            {/* <Results results={analysisResults}/> */}
            {analysisResults.map((result, index) => (
                <Result key={index} result={result} onDelete={removeAnalysisResult} />
            ))}

        </div>
    )
}

export default withRouter(ResultList)

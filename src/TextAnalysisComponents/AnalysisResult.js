import React from 'react'
//import { History } from 'history'
import { useHistory } from 'react-router-dom'
//import { Doughnut, Radar } from 'react-chartjs-2'
import { Radar } from 'react-chartjs-2'
import Results from './Results'
import AddAnalysisResult from './AddAnalysisResult'

import { useEffect, useState } from "react";
import ResultList from './ResultList';
import { Api } from '@mui/icons-material'



function AnalysisResult({ koziproResult, objectName, objectText }) {

  const [analysisResults, setAnalysisResult] = useState([])

  const history = useHistory()

  //分析結果一覧をサーバーから取得
  const resultList = async () => {
    history.push({ pathname: '/TextAnalysisComponents/ResultList' })

  }

  //分析結果をレーダーチャートで表示させるためのリスト
  const analysisResultList = []
  analysisResultList.push(koziproResult.excite)
  analysisResultList.push(koziproResult.pleasant)
  analysisResultList.push(koziproResult.calm)
  analysisResultList.push(koziproResult.nervous)
  analysisResultList.push(koziproResult.boring)
  analysisResultList.push(koziproResult.unpleasant)
  analysisResultList.push(koziproResult.surprise)
  analysisResultList.push(koziproResult.sleepy)
  analysisResultList.push(koziproResult.myakuari)


  //分析結果の新規、取得など操作するためのメソッド

  //新規の分析結果をサーバーに保存

  const addResult = async (analysisResult) => {
    const res_add = await fetch('http://localhost:5200/analysisResults', {
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
    <>

      <Radar className="kzAnalysisGraph"
        data={{
          labels: [
            'excite',
            'pleasant',
            'calm',
            'nervous',
            'boring',
            'unpleasant',
            'surprise',
            'sleepy',
            'myakuari'
          ],
          datasets: [{
            label: '分析結果',
            data: analysisResultList,
            fill: true,
            backgroundColor: 'rgba(147, 112, 219, 0.2)',
            borderColor: 'rgb(147, 112, 219)',
            pointBackgroundColor: 'rgb(147, 112, 219)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff'
          }
          ],

        }

        }

      />

      <AddAnalysisResult onAdd={addResult} user={objectName} content={objectText} koziproResult={koziproResult} />
      <button className="btn btn-success btn-lg" id="checkResult" onClick={() => resultList()}>結果一覧</button>

    </>
  )
}

export default AnalysisResult

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Radar } from 'react-chartjs-2'
import AddAnalysisResult from './AddAnalysisResult'

import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



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

      <AddAnalysisResult user={objectName} content={objectText} koziproResult={koziproResult} />
      <Box marginTop={2}>
        <Button variant="contained" color="secondary" id="checkResult" onClick={() => resultList()}>結果一覧</Button>

      </Box>

    </>
  )
}

export default AnalysisResult

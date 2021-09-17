import React from 'react'
//import { History } from 'history'
import { useHistory } from 'react-router-dom'
//import { Doughnut, Radar } from 'react-chartjs-2'
import { Radar } from 'react-chartjs-2'




import { useEffect, useState } from "react";
import ResultList from './ResultList';

function AnalysisResult({ koziproResult, objectName, objectText }) {

　const [saveAnalysisResult,setSaveAnalysisResult] = useState(false)


  // ボタン「結果保存」をクリックして、「保存」<->「廃棄」状態を反転させる
  const toggleSaveAnalysisResult = () =>{
    setSaveAnalysisResult(!saveAnalysisResult)
    
  }

  const history = useHistory()
  //path=/textpageに遷移する関数。選択先のコンポネントはApp.jsのRouteで設定
  const selectText = async (e) => {

    history.push({ pathname: '/textpage' })
    return
  }

  const submitResult = async (e) => {

    e.preventDefault();
  
  
    return
  }

  //分析結果一覧をサーバーから取得
  const resultList = async () => {
    history.push({ pathname: '/TextAnalysisComponents/ResultList' })
  }



  
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


  //console.log(analysisResultList)




  return (
    <>
      {/* <div className="text-center">
        excite: {koziproResult.excite} <br></br>
        pleasant:{koziproResult.pleasant} <br></br>
        calm:{koziproResult.calm} <br></br>
        nervous:{koziproResult.nervous}<br></br>
        boring:{koziproResult.boring}<br></br>
        unpleasant:{koziproResult.unpleasant}<br></br>
        surprise:{koziproResult.surprise}<br></br>
        sleepy:{koziproResult.sleepy}<br></br>
        myakuari:{koziproResult.myakuari}<br></br>
      </div> */}


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

      <button className="btn btn-secondary btn-lg" id="saveResult" onClick={()=>toggleSaveAnalysisResult()}>結果保存</button>
      {saveAnalysisResult && <ResultList userName={objectName} chatContent={objectText} koziproResult={analysisResultList}/>}
      <button className="btn btn-secondary btn-lg" id="cancelText" onClick={selectText}>リセット</button>
      <button className="btn btn-success btn-lg" id="checkResult" onClick={resultList}>結果一覧</button>
    




    </>
  )
}

export default AnalysisResult

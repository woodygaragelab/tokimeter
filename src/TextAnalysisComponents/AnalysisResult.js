import React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router-dom'
import { Doughnut, Radar } from 'react-chartjs-2'

function AnalysisResult({ koziproResult }) {
  const history = useHistory()
  //path=/textpageに遷移する関数。選択先のコンポネントはApp.jsのRouteで設定
  const selectText = () => {
    history.push({ pathname: '/textpage' })
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

  console.log(analysisResultList)


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

      <form >
        <button className="btn btn-primary btn-lg" id="sendText">結果保存</button>
        <button className="btn btn-secondary btn-lg" id="cancelText" onClick={selectText}>リセット</button>

      </form>

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
            label: 'My First Dataset',
            data: analysisResultList,
            fill: true,
            backgroundColor: 'rgba(147, 112, 219, 0.2)',
            borderColor: 'rgb(147, 112, 219)',
            pointBackgroundColor: 'rgb(147, 112, 219)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff'
          }
            
         
          

          ]
        }

        }

      />


    </>
  )
}

export default AnalysisResult

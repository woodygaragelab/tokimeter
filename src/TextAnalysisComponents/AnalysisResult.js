import React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router-dom'

function AnalysisResult({ koziproResult }) {
    const history = useHistory()
    //path=/textpageに遷移する関数。選択先のコンポネントはApp.jsのRouteで設定
  const selectText = () =>{
    history.push({pathname: '/textpage'})
  }

  

    return (
        <>
        <div className="text-center">
            excite: {koziproResult.excite} <br></br>
            pleasant:{koziproResult.pleasant} <br></br>
            calm:{koziproResult.calm} <br></br>
            nervous:{koziproResult.nervous}<br></br>
            boring:{koziproResult.boring}<br></br>
            unpleasant:{koziproResult.unpleasant}<br></br>
            surprise:{koziproResult.surprise}<br></br>
            sleepy:{koziproResult.sleepy}<br></br>
            myakuari:{koziproResult.myakuari}<br></br>
        </div>
       
        <form >
             <button className="btn btn-primary btn-lg" id="sendText">結果保存</button>
        <button className="btn btn-secondary btn-lg" id="cancelText" onClick={selectText}>再送信</button>

                </form>
        </>
    )
}

export default AnalysisResult

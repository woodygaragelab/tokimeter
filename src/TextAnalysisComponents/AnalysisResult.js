import React from 'react'

function AnalysisResult({ koziproResult }) {
    return (
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
    )
}

export default AnalysisResult

import React from 'react'
import { useState } from 'react'
import AnalysisResult from './AnalysisResult'
import Loader from 'react-loader-spinner'


// TextAnalizerコンポネント
export const TextAnalizer = () => {

    return (
      <div>
        <div className="kzGraph">
          <p></p>
        </div>
  
        {/* テキスト解析のアニメーション。後でテキスト解析画面に置き換える */}
        <div className="mt-4">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} // msec
          />
        </div>
      </div>
  
    );
  }

export const TextAnalysis = () => {
    const baseUrl = "https://kojipro.an.r.appspot.com/getscore?text="
    const [data, setData] = useState('')
    const [result, setResult] = useState('')
    const [member, setMember] = useState('')
    const [isGetResult,setIsGetResult] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        // デバッグ用
        console.log(data)
        console.log(member)

        if (!data) {
            alert('会話内容を入力ください')
            return
        }

        if (data.trim() == '') {
            alert('会話内容を入力ください')
            return
        }

        if (!member) {
            alert('名前を入力ください')
            return
        }

        if (!member) {
            alert('名前を入力ください')
            return
        }

        // Kozipro分析結果の取得
        fetch(baseUrl + data)
            .then((response) => {
                response.json().then(analysisResult => {
                    setResult(analysisResult)
                    setIsGetResult(!isGetResult)
                })
            })

    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>名前 </label>
                        <input onChange={(e) => setMember(e.target.value)} placeholder='メンバーの名前を入れてね' value={member} id="input-member" className="from-control" /><br></br>
                        <label>分析内容</label>
                        <textarea onChange={(e) => setData(e.target.value)} placeholder='会話内容を入れてね' value={data} id="input-text" className="form-control" />
                    </div>
                    <button className="btn btn-success mr-4" id="sendText">送信</button><br></br>
                </form>
               
                {isGetResult && <AnalysisResult koziproResult={result} />}
            </div>
        </>
    )
}

export default TextAnalysis

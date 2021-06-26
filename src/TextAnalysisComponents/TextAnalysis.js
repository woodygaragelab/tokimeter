import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export const TextAnalysis = () => {
    const url = "https://kojipro.an.r.appspot.com/getscore?text="
    const [data, setData] = useState('')
    const [result, setResult] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)

        if (!data) {
            alert('会話内容を入力ください')
            return
        }
        
        if(data.trim()==''){
            alert('会話内容を入力ください')
            return
        }

        // Kozipro分析結果の取得
        fetch(url + data)
            .then((response) => {
                response.json().then(analysisResult => {
                    setResult(analysisResult)
                })
            })

    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>分析内容</label>
                        <textarea onChange={(e) => setData(e.target.value)} placeholder='会話内容を入れてね' value={data} id="input-text" className="form-control" />
                    </div>
                    <button className="btn btn-success mr-4" id="sendText">送信</button>

                </form>
                <p>
                    excite: {result.excite} <br></br>
                    pleasant:{result.pleasant} <br></br>
                    calm:{result.calm} <br></br>
                    nervous:{result.nervous}<br></br>
                    boring:{result.boring}<br></br>
                    unpleasant:{result.unpleasant}<br></br>
                    surprise:{result.surprise}<br></br>
                    sleepy:{result.sleepy}<br></br>
                    myakuari:{result.myakuari}<br></br>
                </p>
            </div>
        </>
    )
}

export default TextAnalysis

import React from 'react'
//import { useState, useEffect } from 'react'
import { useState } from 'react'
import AnalysisResult from './AnalysisResult'
import TextAnalizer from './TextAnalizer'
import { useFetch } from './useFetch'




export const TextAnalysis = () => {
    const baseUrl = "https://kojipro.an.r.appspot.com/getscore?text="
    const [data, setData] = useState('')
    const [result, setResult] = useState('')
    const [member, setMember] = useState('')
    const [isGetResult, setIsGetResult] = useState(false)
    const [isShowTextAnalizer, setIsShowTextAnalizer] = useState(false)


    // スリープ用
    const sleep = (msec) => {
        return new Promise((resolve) => {

            setTimeout(() => { resolve() }, msec);

        })
    }

    const fetchResult = async () => {
        await sleep(7000);
        setIsShowTextAnalizer(false)
        fetch(baseUrl + data)
            .then((response) => {
                response.json().then(analysisResult => {
                    setResult(analysisResult)
                    setIsGetResult(!isGetResult)
                })
            })
    }


    // const { resultData, loading } = useFetch(baseUrl + data)

    // console.log("--------------")
    // console.log(resultData)

    const handleSubmit = async (e) => {

        e.preventDefault();
        // デバッグ用
        // console.log(data)
        // console.log(member)


        if (!data) {
            alert('会話内容を入力ください')
            return
        }

        if (data.trim() === '') {
            alert('会話内容を入力ください')
            return
        }

        if (!member) {
            alert('名前を入力ください')
            return
        }


        // Kozipro分析結果の取得
        fetchResult();
        setIsShowTextAnalizer(true)
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

                    {!isGetResult && <button className="btn btn-success mr-4" id="sendText">送信</button>}<br></br>

                </form>

                {isShowTextAnalizer && <TextAnalizer></TextAnalizer>}
                {isGetResult && <AnalysisResult koziproResult={result} objectName={member} ObjectText={data} />}
            </div>
          
        </>
    )
}

export default TextAnalysis

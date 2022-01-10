import React from 'react'
// import { useState, useEffect } from 'react'
import { useEffect, useState } from 'react';
import { Button, TextField, Box, TextareaAutosize } from '@material-ui/core'
import AnalysisResult from './AnalysisResult'
import TextAnalizer from './TextAnalizer'
import HeartPage, { Heart } from '../heartpage'
import { useFetch } from './useFetch'
import heartpage from '../heartpage'





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

    const handleSubmit = async (e) => {

        e.preventDefault();

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

        console.log("送信ボタンを押した！")

        // Kozipro分析結果の取得
        fetchResult();
        setIsShowTextAnalizer(true)
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div>
                    <Box>
                        <TextField label="名前" onChange={(e) => setMember(e.target.value)} value={member} id="input-member" />
                        <Box marginTop={6}>
                            <TextareaAutosize minRows={6} onChange={(e) => setData(e.target.value)} placeholder='会話内容を入れてね' value={data} style={{ width: 800 }} id="input-text" />
                        </Box>

                    </Box>
                    {!isGetResult && <Box marginTop={3}>
                        <Button id="sendText" variant="contained" color="secondary" type="submit">送信</Button>
                    </Box>}
                    </div>
                </form>

                {isShowTextAnalizer && <TextAnalizer></TextAnalizer>}
                {isGetResult && <AnalysisResult koziproResult={result} objectName={member} objectText={data} />}

            </div>

        </>
    )
}

export default TextAnalysis

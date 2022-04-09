import React from 'react'
// import { useState, useEffect } from 'react'
import { useEffect, useState } from 'react';
import { Button, TextField, Box, TextareaAutosize, Container } from '@material-ui/core'
import AnalysisResult from '../../../TextAnalysisComponents/AnalysisResult'
import TextAnalizer from '../../../TextAnalysisComponents/TextAnalizer'

//Select
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


//sound effects//
import { useRef } from 'react';

import useSound from 'use-sound';
import Sound from '../../../sound/shiningsound_1.mp3'
//sound effects//

export const TextAnalysis = () => {
    const baseUrl = "https://kojipro.an.r.appspot.com/getscore?text="
    const [data, setData] = useState('') // 会話内容
    const [result, setResult] = useState('')　// 分析後の結果
    const [member, setMember] = useState('') // 名前
    const [isGetResult, setIsGetResult] = useState(false)
    const [isShowTextAnalizer, setIsShowTextAnalizer] = useState(false)

    //sound effects//
    const [score_0, setScore] = useState(50)
    const [play, { stop, pause }] = useSound(Sound);
    const [playLoud] = useSound(Sound, { volume: 2 });

    const clickA = () => {
        setScore(score_0 + 50);
        if (audioContext.current.state === "suspended") {
            audioContext.current.resume();
        }

        play();
    };


    const audioContext = useRef(null);
    useEffect(() => {
        audioContext.current = new AudioContext();
    }, []);
    //sound effects//

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


        // Kozipro分析結果の取得
        fetchResult();
        setIsShowTextAnalizer(true)
    }

    return (
        <>
            <Container>
                <Box >
                    <form onSubmit={handleSubmit}>
                        <div>
                            
                            <Box>


                                <Box width="200px" margin="auto">
                                <InputLabel id="member-simple-select-label">名前</InputLabel>
                                    <Select
                                        id="member-simple-select"
                                        label="名前"
                                        value={member}
                                        helperText="気になる相手の名前を選択ください"
                                        onChange={(e) => setMember(e.target.value)}
                                        fullWidth
                                    >
                                        {/* Names list replaced by server's name list in future. */}
                                        <MenuItem value="Member1">Member1</MenuItem>
                                        <MenuItem value="Member2">Member2</MenuItem>
                                        <MenuItem value="Member3">Member3</MenuItem>
                                    </Select>


                                </Box>

                                <Box marginTop={6}>
                                    <TextField
                                        variant="standard"
                                        label="会話内容"
                                        id="input-text"
                                        multiline
                                        rows={6}
                                        onChange={(e) => setData(e.target.value)}
                                        placeholder='会話内容を入れてね'
                                        value={data}

                                    // style={{ width: 600 }} 
                                    />
                                </Box>

                            </Box>
                            {!isGetResult && <Box marginTop={3}>
                                <Button
                                    id="sendText"
                                    variant="contained"
                                    color="secondary"
                                    type="submit" onClick={() => clickA()}>送信</Button>
                            </Box>}
                        </div>
                    </form>
                </Box>
            </Container>
            {isShowTextAnalizer && <TextAnalizer></TextAnalizer>}
            {isGetResult && <AnalysisResult koziproResult={result} objectName={member} objectText={data} />}



        </>
    )
}

export default TextAnalysis

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
import SendIcon from '@mui/icons-material/Send'


//sound effects//
import { useRef } from 'react';

import useSound from 'use-sound';
import Sound from '../../../sound/shiningsound_1.mp3'
import { GetNameList } from '../../../components/getmembers';
//sound effects//

export const TextAnalysis = () => {
    //const baseUrl = "https://kojipro.an.r.appspot.com/getscore?text="
    //const baseUrl = "https://kozipro.an.r.appspot.com/getscore?text="  // GCP API
    const baseUrl = "https://fvpqeyzdyj.execute-api.ap-northeast-1.amazonaws.com/dev?text="
    const [data, setData] = useState('') // 会話内容
    const [result, setResult] = useState('')　// 分析後の結果
    const [member, setMember] = useState('') // 名前
    const [nameList, setNameList] = useState(['member1', 'member2', 'member3']) // 名前のリストと初期値

    const [isGetResult, setIsGetResult] = useState(false)
    const [isShowTextAnalizer, setIsShowTextAnalizer] = useState(false)
    const getNames = async () => {        // server(DB)からmemberの名前リストを取得する
        setNameList(await GetNameList());     // 名前リスト取得関数(非同期)の戻り値をnamelistにセットする
    };
    useEffect(() => { getNames(); }, []);  // 画面初期設定時にmemberの名前リストを取得する

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
                                        {nameList.map((name, index) => (   // 名前の選択値をnameListからmapして作成する
                                            <MenuItem key={index} value={name}>{name}</MenuItem>
                                        ))}
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
                                    endIcon={<SendIcon />}
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

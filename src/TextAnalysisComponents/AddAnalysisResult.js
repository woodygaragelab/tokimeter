import React from 'react'
import { useState } from 'react'
import {createTextAnalysisResult} from '../../src/graphql/mutations'
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';


const AddAnalysisResult =  ({ user, content, koziproResult }) => {

  //ユーザー情報、会話内容と分析結果の保存用
  const [Name, setName] = useState(user)
  const [TextContent, setTextContent] = useState(content)
  //const [excite, setExcite] = useState(Number(koziproResult.excite))
  const [excite,setExcite] = useState(0)
  const [pleasant, setPleasant] = useState(Number(koziproResult.pleasant))
  const [calm, setCalm] = useState(Number(koziproResult.calm))
  const [nervous, setNervous] = useState(Number(koziproResult.nervous))
  const [boring, setBoring] = useState(Number(koziproResult.boring))
  const [unpleasant, setUnpleasant] = useState(Number(koziproResult.unpleasant))
  const [surprise, setSurprise] = useState(Number(koziproResult.surprise))
  const [sleepy, setSleepy] = useState(Number(koziproResult.sleepy))
  const [myakuari, setMyakuari] = useState(Number(koziproResult.myakuari))

  const [isShowSaveButton,setIsShowSaveButton] = useState(true)

  const onSubmit = async () => {

    //名前、テキスト、各評価軸を保存する
    setName(user)
    setTextContent(TextContent)
    setExcite((koziproResult.excite))
    setPleasant(koziproResult.pleasant)
    setCalm(koziproResult.calm)
    setNervous(koziproResult.nervous)
    setBoring(koziproResult.boring)
    setUnpleasant(koziproResult.unpleasant)
    setSurprise(koziproResult.surprise)
    setSleepy(koziproResult.sleepy)
    setMyakuari(koziproResult.myakuari)

   
    console.log("user",user)
    console.log("excite",excite)

    const analysisResultInput = {
      id:uuid(),
      Name,
      TextContent,
      excite,
      pleasant,
      calm,
      nervous,
      boring,
      unpleasant,
      surprise,
      sleepy,
      myakuari
    }

    console.log("analysisResultInput: ", analysisResultInput)

    await API.graphql(graphqlOperation(createTextAnalysisResult, { input: analysisResultInput }))

    //setIsShowSaveButton(!isShowSaveButton)


  }


  return (
    <div>
      {isShowSaveButton &&
      <Button variant="contained" size="small" color="success" onClick={onSubmit} startIcon={<LoyaltyOutlinedIcon />}>
        Save
      </Button>
      }
    </div>
  )
}

export default AddAnalysisResult

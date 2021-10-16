import React from 'react'
import { useState } from 'react'

const AddAnalysisResult = ({ onAdd, user, content, koziproResult }) => {

  //ユーザー情報、会話内容と分析結果の保存用
  const [name, setName] = useState(user)
  const [text, setText] = useState(content)
  const [excite, setExcite] = useState(Number(koziproResult.excite))
  const [pleasant, setPleasant] = useState(Number(koziproResult.pleasant))
  const [calm, setCalm] = useState(Number(koziproResult.calm))
  const [nervous, setNervous] = useState(Number(koziproResult.nervous))
  const [boring, setBoring] = useState(Number(koziproResult.boring))
  const [unpleasant, setUnpleasant] = useState(Number(koziproResult.unpleasant))
  const [surprise, setSurprise] = useState(Number(koziproResult.surprise))
  const [sleepy, setSleepy] = useState(Number(koziproResult.sleepy))
  const [myakuari, setMyakuari] = useState(Number(koziproResult.myakuari))

  const [isShowSaveButton,setIsShowSaveButton] = useState(true)

  const onSubmit = (e) => {
    e.preventDefault()

    //名前、テキスト、各評価軸を保存する
    setName(user)
    setText(content)
    setExcite(koziproResult.excite)
    setPleasant(koziproResult.pleasant)
    setCalm(koziproResult.calm)
    setNervous(koziproResult.nervous)
    setBoring(koziproResult.boring)
    setUnpleasant(koziproResult.unpleasant)
    setSurprise(koziproResult.surprise)
    setSleepy(koziproResult.sleepy)
    setMyakuari(koziproResult.myakuari)

    onAdd({ name, text, excite, pleasant, calm, nervous, boring, unpleasant, surprise, sleepy, myakuari })

    setIsShowSaveButton(!isShowSaveButton)


  }


  return (
    <div>
      {isShowSaveButton &&
      <button onClick={onSubmit}>
        Save
      </button>
      }
    </div>
  )
}

export default AddAnalysisResult

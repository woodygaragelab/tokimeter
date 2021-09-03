import React from 'react'
import { useState } from 'react'

const AddAnalysisResult= ({user,content,koziproResult})=> {

  //ユーザー情報、会話内容と分析結果の保存用


  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [excite, setExcite] = useState(0)
  const [pleasant, setPleasant] = useState(0)
  const [calm, setCalm] = useState(0)
  const [nervous, setNervous] = useState(0)
  const [boring, setBoring] = useState(0)
  const [unpleasant, setUnpleasant] = useState(0)
  const [surprise, setSurprise] = useState(0)
  const [sleepy, setSleepy] = useState(0)
  const [myakuari, setMyakuari] = useState(0)

  //結果を付与する


  //名前、テキスト、各評価軸を保存する
//   setName(user)
//   setText(content)
//   setExcite(koziproResult.excite)
//   setPleasant(koziproResult.pleasant)
//   setCalm(koziproResult.calm)
//   setNervous(koziproResult.nervous)
//   setBoring(koziproResult.boring)
//   setUnpleasant(koziproResult.unpleasant)
//   setSurprise(koziproResult.surprise)
//   setSleepy(koziproResult.sleepy)
//   setMyakuari(koziproResult.myakuari)

//   console.log("!!!!!"+koziproResult.myakuari)

    return (
        <div>
            
        </div>
    )
}

export default AddAnalysisResult

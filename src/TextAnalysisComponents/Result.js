import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { deleteTextAnalysisResult} from '../graphql/mutations';
import { API } from 'aws-amplify';
import Amplify, { graphqlOperation } from "aws-amplify";

//ユーザーと脈アリ点数だけ表示させる
function Result({result}) {

    const removeAnalysisResult = async (id) =>{
        const resultId = id
        const isDelete = window.confirm('分析結果を削除しましょうか。')
        if(isDelete){
            const analysisResultId = {
                id: resultId,
            };

            await API.graphql(graphqlOperation(deleteTextAnalysisResult,{input: analysisResultId}))
        }
    }



    return (
        <div>
            console.log("result",result)
            <h3>{result.name} <FaTimes 
            style={{ color: 'red', cursor: 'pointer' }} 
            onClick={() => removeAnalysisResult(result.id)}
            /></h3>
            {/* 脈アリの値のみ表示させる */}
            <p>名前:{result.Name}</p>
            <p>会話内容：{result.TextContent}</p>
            <p>excite:{result.excite}</p>
            <p>pleasant:{result.pleasant}</p>
            <p>calm:{result.calm}</p>
            <p>nervous:{result.nervous}</p>
            <p>boring: {result.boring}</p>
            <p>unpleasant: {result.unpleasant}</p>
            <p>surprise: {result.surprise}</p>
            <p>sleepy: {result.sleepy}</p>
            <p>MYAKUARI: {result.myakuari}</p>
        </div>
    )
}

export default Result

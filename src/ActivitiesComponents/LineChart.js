import React from 'react'
import { Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import heartRateData from '../BioData/heart_rate_example.json'

const LineChart = () => {

    const heartRateRawData = heartRateData;

    // すべての心拍数をbpmListに保存
    const bpmList = heartRateRawData.map((s, index) => {
        return s.value.bpm

    })

    // Line Chartを描画するための心拍数リストの宣言
    let sampledList = []
    let sampleStep = 60

    // 設定されるステップ（sampleStep）で、サンプルする
    for (let i in bpmList) {
        if (i % sampleStep === 0) {
            sampledList.push(bpmList[i])
        }
    }

    // debug用
    //console.log(sampledList.length)

    let labelIndex = 0
    const labelList = []　// X軸座標格納用リスト
    let timeIndex = 0　// X軸（時間軸座標）初期値は０で、上限24
    while (labelIndex < sampledList.length) {
        let timeUnit = parseInt(sampledList.length / 24)　// X軸数値（1:00, 2:00 ...）の間隔　
        //debug用
        //console.log(timeUnit)
        if (labelIndex % timeUnit === 0) {
            labelList.push(timeIndex + ":00")　// 整除するのみ、X軸上に出力
            timeIndex++
            if (timeIndex >= 25) break
        }
        else { labelList.push("") }　// X軸数値（1,2 ...）以外の場合、空白を入れる
        labelIndex++
    }


    return (<>

        <Line
            data={{
                labels: labelList,　// X 軸
                datasets: [{
                    label: 'heart Beat',
                    data: sampledList,　// Y 軸　
                    borderColor: 'purple',
                    borderWidth: 2,
                    pointStyle: 'cross'
                },

                ],
            }}
            width={400}
            height={200}
            options={{
                maintainAspectRatio: false,
                animation:false
            }}
        />
    </>)
}


export default LineChart

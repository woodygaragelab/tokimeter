import React from 'react'
import {Line} from 'react-chartjs-2'
import heartRateData from '../BioData/heart_rate_example.json'

const heartRateRawDatas = heartRateData;

const bpmList = heartRateRawDatas.map((s, index) => {
    return s.value.bpm

})

let sampledList = []
let sampleStep = 60

for (let i in bpmList) {
    if (i % sampleStep === 0) {
        sampledList.push(bpmList[i])
    }
}

console.log(sampledList.length)

let labelIndex = 0
const labelList = []
let timeIndex = 0
while (labelIndex < sampledList.length) {
    let timeUnit = parseInt(sampledList.length / 24)
    console.log(timeUnit)
    if (labelIndex % timeUnit === 0) {
        labelList.push(timeIndex + ":00")
        timeIndex++
        if (timeIndex >= 25) break
    }
    else { labelList.push("") }
    labelIndex++
}

const LineChart = () => {


    return <div>

        <Line
            data={{
                labels: labelList,
                datasets: [{
                    label: 'heart Beat',
                    data: sampledList,
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
            }}
        />
    </div>
}


export default LineChart

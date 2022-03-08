import React from 'react'
import EventActivityCore from './EventActivityCore'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Header from '../../../components/header'
import LineChart from '../../../ActivitiesComponents/LineChart'
import Box from '@material-ui/core/Box'
import { IconButton, TextField } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Storage } from 'aws-amplify';
import heartRateDataTemp from '../../../BioData/heart_rate_example.json'


const theme = createTheme({
    palette: {
        primary: { main: pink[50], },
        secondary: { main: pink[300], },
    },
});


function EventActivityPage() {

    const [bioData, setBioData] = useState();
    const [heartRateData, setHeartrateData] = useState();
    const [showGraph, setShowGraph] = useState(false);

    const uploadBioData = async () => {
        // Upload the bio data
        console.log('bioData', bioData)
        // uuid() unique name
        const fileName = `${uuid()}.json`;
        await Storage.put(fileName, bioData, { contentType: 'application/json' }, { level: 'public' })
        if (bioData) {
            const heartRateDataUrl = await Storage.get(fileName);
            console.log("Output: ", heartRateDataUrl)

            fetch(heartRateDataUrl)
                .then(result => result.json())
                .then((heartRateData) => {
                    console.log('Output: ', heartRateData);
                    setHeartrateData(heartRateData)
                    setShowGraph(true)
                }).catch(err => console.error(err));

        }

    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />

                <Box marginTop={10}>


                    <input type="file" accept=".json" onChange={e => setBioData(e.target.files[0])} />
                    <IconButton onClick={uploadBioData}>
                        Upload Bio Data
                        <PublishIcon />
                    </IconButton>

                </Box>


                <Box sx={{ height: 200 }}>
                    <Box sx={{ background: '#eecccc' }}>

                        {showGraph ?(<LineChart heartRateData={heartRateData}/>):"Upload Your bio Data"}
                    </Box>

                </Box>

                <Box marginTop={1}>
                    <EventActivityCore />
                </Box>


            </ThemeProvider>

        </div>
    )
}

export default EventActivityPage



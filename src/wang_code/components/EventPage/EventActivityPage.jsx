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
import Storage from 'aws-amplify'

const theme = createTheme({
    palette: {
        primary: { main: pink[50], },
        secondary: { main: pink[300], },
    },
});


function EventActivityPage() {
    
    const [bioData,setBioData] = useState();

    const uploadBioData = async () => {
        // Upload the bio data
       console.log('bioData',bioData)
       // uuid() unique name
       //const {key} = await Storage.put(`${uuid()}.json`,{contentType:'application/json'})
       
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />
               
                <Box marginTop={10}>
               
            
                <input type="file" accept=".json" onChange={e => setBioData(e.target.files[0])} />
                <IconButton onClick={uploadBioData}> 
                      Upload Bio Data(Coming soon)
                      <PublishIcon />
                    </IconButton>
            
                </Box>
           

                <Box sx={{ height: 200 }}>
                    <Box sx={{ background: '#eecccc' }}>
                        <LineChart />
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



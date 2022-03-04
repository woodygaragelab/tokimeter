import React from 'react'
import EventActivityCore from './EventActivityCore'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Header from '../../../components/header'
import LineChart from '../../../ActivitiesComponents/LineChart'
import Box from '@material-ui/core/Box'

const theme = createTheme({
    palette: {
        primary: { main: pink[50], },
        secondary: { main: pink[300], },
    },
});


function EventActivityPage() {

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />
                <Box sx={{ height: 300 }}>
                    <Box sx={{ height: 100, background: '#ffffff', border: '1px solid black' }} />
                    <Box sx={{ background: '#bb6677' }}>
                        <LineChart />
                    </Box>

                </Box>
                <Box >
                    <EventActivityCore />
                </Box>


            </ThemeProvider>

        </div>
    )
}

export default EventActivityPage
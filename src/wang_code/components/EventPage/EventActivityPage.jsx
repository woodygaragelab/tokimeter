import React from 'react'
import EventActivityCore from './EventActivityCore'

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Header from '../../../components/header'

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
                <EventActivityCore />
            </ThemeProvider>

        </div>
    )
}

export default EventActivityPage
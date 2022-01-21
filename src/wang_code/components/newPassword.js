import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useHistory } from 'react-router-dom';

import '../../App.css';
import Header from "../../components/header"


import { Container, Box, TextField, Button } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Account } from './Account';
import ChangePassword from './ChangePassword';
import SignUp from '../../SignUp';

const theme = createTheme({
    palette: {
        primary: { main: pink[50], },
        secondary: { main: pink[300], },
    },
});

function forgetPassword() {

    return (
        <ThemeProvider theme={theme}>
            <Header />

            <Container>
                <Box style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box width={1 / 4} />
                    <Box width={1 / 2}
                        sx={{
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'col'
                        }}>
                        <form>
                            <Box sx={{ height: 200 }} />
                            <Account>
                                <ChangePassword />
                            </Account>

                        </form>
                    </Box>

                    <Box width={1 / 4} />
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default withRouter(forgetPassword) 
import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useHistory } from 'react-router-dom';

import '../../App.css';
import Header from "../../components/header"
import {useState, useEffect} from 'react'

import { Container, Box, TextField, Button } from '@material-ui/core';
import { ThemeProvider, createTheme }        from '@material-ui/core/styles';
import pink                                  from '@material-ui/core/colors/pink';
import SignIn from './SignIn';
import { Account } from './Account';
import Status from './Status';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

function LoginPage() {

  const history = useHistory();
  const selectHome = () => {  history.push({ pathname: '/homepage' });  }

  const [loggedIn, setLoggedIn] = useState(false)
  const [isUser,setIsUser] = useState(true)
    
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Container>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>   
        <Box width={1/4}/> 
        <Box width={1/2}
          sx={{ padding: '10px',
                display: 'flex',
                flexDirection: 'col'
              }}> 
          <form>
          <Box sx={{ height: 200}}/>
          <Account>
            <Status />
            <SignIn />
          </Account>
          </form>
        </Box>

        <Box width={1/4}/>
      </Box>

      </Container>
    </ThemeProvider>
  );
}

export default withRouter(LoginPage) // 画面遷移対象にするので、withRoute()を使う
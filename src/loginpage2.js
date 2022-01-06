import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import './Login.css';        
import Header1 from "./components/header1";

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Container, Box, TextField, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

function LoginPage2() {

  const history = useHistory();
  const selectHome = () => {  history.push({ pathname: '/homepage2' });  }
    
  return (
    <ThemeProvider theme={theme}>
      <Header1 />

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
          <Box>
            <TextField label="ID" id="userid" fullWidth />
            <TextField label="Password" id="password" fullWidth />
            forget your password ? click here
          </Box>
          <Box>
            <Button   
              onClick={selectHome}
              variant="contained" color="secondary" style={{ width: '100%' }}>
              Login
            </Button>
          </Box>
          </form>
        </Box>

        <Box width={1/4}/>
      </Box>

      </Container>
    </ThemeProvider>
  );
}

export default withRouter(LoginPage2) // 画面遷移対象にするので、withRoute()を使う

// <Box width={1/4} border={1}/> 
// {/* <Box width={1/2} style={{ padding: '18px' }} border={1} sx={{ borderColor: 'grey.500' }}>  */}
// {/* <TextField label="Password" id="password" fullWidth
// inputProps={{style: {fontSize: 16} }}
// InputLabelProps={{ style: {fontSize: '16px', color: 'grey'}}}
// /> */}

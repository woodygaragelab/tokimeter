import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useHistory } from 'react-router-dom';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import Header from "./components/header";

import { Container, Box, TextField, Button } from '@material-ui/core';
import { ThemeProvider, createTheme }        from '@material-ui/core/styles';
import pink                                  from '@material-ui/core/colors/pink';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

function LoginPage() {

  const history = useHistory();
  const selectHome = () => {  history.push({ pathname: '/homepage' });  }
    
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

export default withRouter(LoginPage) // 画面遷移対象にするので、withRoute()を使う
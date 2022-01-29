import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';  
import { Account } from './Account';
import pink                                  from '@material-ui/core/colors/pink';
import Header from './headerW'
import { Container, Box } from '@material-ui/core';
import Verification from './verification'


const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});


const verificationPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Account>
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
              <Verification />
            
          </Account>  
         
          </form>
        </Box>

        <Box width={1/4}/>
      </Box>

      </Container>
      </Account>
    </ThemeProvider>
  );
}

export default withRouter(verificationPage);

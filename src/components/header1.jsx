import React from "react";
import "./header1.css";

import AppBar from '@material-ui/core/AppBar';
//import Button from '@material-ui/core/Button';
//import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header1(props) {
  //const { className } = props;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <ExitToAppIcon />
        {/* <Box style={{ flexGrow: 1,fontSize: 24,fontWeight: 'bold'}}> border={1}> */}
        <Box sx={{ flexGrow: 1,fontSize: 24,fontWeight: 'bold'}}> {/* border={1}> */}
            Kozipro 0101
        </Box>
        <SettingsIcon/>
      </Toolbar>
    </AppBar>
  
  );
}

export default Header1;

import React from "react";
import "./header1.css";

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header1(props) {

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <ExitToAppIcon />
        <Box sx={{ flexGrow: 1,fontSize: 24,fontWeight: 'bold'}}> {/* border={1}> */}
            Kozipro 0106
        </Box>
        <SettingsIcon/>
      </Toolbar>
    </AppBar>
  
  );
}

export default Header1;

import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory }         from 'react-router-dom';

function Header(props) {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const navigate = (value)=> {
    if (value==0) { history.push({ pathname: '/loginpage' });   }
    else          { history.push({ pathname: '/homepage'  });  }
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <ExitToAppIcon />    {/* onClick={navigate(0)} */}
        <Box sx={{ flexGrow: 1,fontSize: 24,fontWeight: 'bold'}}> {/* border={1}> */}
            Kozipro 0108
        </Box>
        <SettingsIcon/>
      </Toolbar>
    </AppBar>
  
  );
}

export default Header;
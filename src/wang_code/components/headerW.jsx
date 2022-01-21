import React, { useContext, useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { AccountContext } from "./Account"
import { IconButton } from "@material-ui/core";

const HeaderW = () => {

  // ログイン/ログアウト状態の表示  
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  //状態を更新

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* ログイン状態により、ログアウトマークの表示可否 */}
        {status ?
          <IconButton >
            <ExitToAppIcon onClick={logout}/>
          </IconButton>
          : ""        }
        <Box sx={{ flexGrow: 1, fontSize: 24, fontWeight: 'bold' }}> {/* border={1}> */}
          Kozipro 0121_wangTest
        </Box>
        <SettingsIcon />
      </Toolbar>
    </AppBar>

  );
}

export default HeaderW;
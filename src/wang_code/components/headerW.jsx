import React, { useContext, useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AccountContext } from "./Account"
import { IconButton } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";


const HeaderW = () => {

  // ログイン/ログアウト状態の表示  
  const [status, setStatus] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  const changePassword = () => {
    setAnchorEl(null);
    history.push('./newPasswordW');
  }

  const changeEmail = () => {
    setAnchorEl(null);
    history.push('./newEmailW')
  }


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
            <ExitToAppIcon onClick={logout} />
          </IconButton>


          : undefined}
        <Box sx={{ flexGrow: 1, fontSize: 24, fontWeight: 'bold' }}>

          Kozipro 20220129_wang
        </Box>
        {status ?
          <IconButton>
            <SettingsIcon id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} />
          </IconButton>
          : undefined}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* メニュー内容、ここで拡張 */}
          <MenuItem onClick={changePassword}>Change Password</MenuItem>
          <MenuItem onClick={changeEmail}>Change Email</MenuItem>


        </Menu>

      </Toolbar>
    </AppBar>

  );
}

export default HeaderW;
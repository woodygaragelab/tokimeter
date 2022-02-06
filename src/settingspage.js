//homepageをコピーして作成。編集中。
import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "./components/header";
import Footer from "./components/footer";
import img1_me       from './img/me.png'   // settingspageに表示する顔写真

//テンプレから追加
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BrushIcon from '@mui/icons-material/Brush';
import HelpIcon from '@mui/icons-material/Help';
//テンプレから追加

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

class SettingsPage extends Component {       // SettingsPage:設定ページ
  constructor(props){                    // props: SettingsPageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: SettingsPageコンポネントが保持するデータ
  }

  render() {

    return (
      <ThemeProvider theme={theme}>
      <Header/>

      <Box sx={{height:400}}>
        <Box sx={{height:400, width:400, position: 'static', top: 800, left:800}}>
          <img src={img1_me} className="kzImage2" alt="img1_me"/>
        </Box>
      </Box>
      <Footer pageid="1"/> 
      //テンプレから追加
      <Paper position="static" maxwidth="x1">
        <MenuList>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <MailIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText align="left">Change Email</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <KeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText align="left">Change Password</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <NotificationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText align="left">Notifications</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <BrushIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText align="left">Change Theme</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText align="left">Help</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      //テンプレから追加
      </ThemeProvider>
    );
  }
}
export default withRouter(SettingsPage) // 画面遷移対象にするので、withRoute()を使う
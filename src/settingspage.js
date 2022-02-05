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
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
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

      <Box sx={{height:800}}>
        <Box sx={{height:100, width:100, position: 'absolute', top: 200, left:400}}>
          <img src={img1_me} className="kzImage2" alt="img1_me"/>
        </Box>
      </Box>
      <Footer pageid="1"/> 
      //テンプレから追加
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Email</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Theme</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      //テンプレから追加
      </ThemeProvider>
    );
  }
}
export default withRouter(SettingsPage) // 画面遷移対象にするので、withRoute()を使う
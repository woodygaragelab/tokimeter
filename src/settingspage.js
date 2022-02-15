//homepageをコピーして作成。編集中。
import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

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

//テンプレから追加（Avatat with badge)
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
//テンプレから追加（Avatar with badge)
import { Box } from '@material-ui/core';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});
//テンプレから追加（Avator with badge）
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'static',
      top: 0,
      left: 0,
      width: '100%',//ステータスボタン点滅の範囲
      height: '100%',//ステータスボタン点滅の範囲
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

//テンプレから追加（Avatar with badge）

class SettingsPage extends Component {       // SettingsPage:設定ページ
  constructor(props){                    // props: SettingsPageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: SettingsPageコンポネントが保持するデータ
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Footer pageid="3"/>
      <Header/>
      <Box sx={{position: 'absolute', left:'50%', top:'200px'}}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}//緑のアイコンの位置
        variant="dot"
      >
        <Avatar alt="Me"src={img1_me} sx={{ width: 56, height: 56 }}/>
      </StyledBadge>
      </Box>

      <Paper sx={{position:'absolute', bottom:'55px', width:'100%'}}>
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
      </ThemeProvider>
    );
  }
}
export default withRouter(SettingsPage) // 画面遷移対象にするので、withRoute()を使う
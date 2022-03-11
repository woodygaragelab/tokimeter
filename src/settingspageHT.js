//homepageをコピーして作成。編集中。
import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { Storage } from 'aws-amplify';

import { Link, useHistory } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "./components/header";
import Footer from "./components/footer";
import default_icon       from './img/default_icon.jpg'   // settingspageに表示する顔写真

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

//テンプレから追加
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
//テンプレから追加

//テンプレから追加（Avatat with badge)
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
//テンプレから追加（Avatar with badge)
import { Box } from '@material-ui/core';

//テンプレから追加（Upload button）// 
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

//function UploadButtons() {
// const UploadButtons = (() => (
//   //return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <label htmlFor="icon-button-file">
//         {/* change takamura --> */}
//         {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
//         <Input accept="image/*" id="icon-button-file" type="file" className="form-control" onChange={this.onChangeImage}/>
//         {/* <-- change takamura */}

//         <IconButton color="primary" aria-label="upload picture" component="span">
//           <AddAPhotoIcon />
//         </IconButton>
//       </label>
//     </Stack>
//   //);
// ));
//テンプレから追加（Upload button）// 

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

class SettingsPageHT extends Component {       // SettingsPage:設定ページ
  constructor(props){                    // props: SettingsPageコンポネントが受け取るパラメータ
    super(props);
    // takamura 追加 -->>
    this.onChangeImage = this.onChangeImage.bind(this);
    this.state = {
      imagefilename: "",
      imageurl: ""
    };
    // <<-- takamura 追加

  }
  
  // takamura 追加 -->>
  async onChangeImage(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    this.setState({imagefile: file.name });
    // imageFileをStorage(s3 service)に保存する
    await Storage.put(file.name, file,{ level: 'public' }); // publicにしないとStorage.getできない
    if (this.state.imagefile) {
      // imageFile名からimageUrlを取得する
      const imageurl = await Storage.get(this.state.imagefile);
      this.setState({imageurl: imageurl});
    }
  }
  // <<-- takamura 追加


  render() {
    return (
      <ThemeProvider theme={theme}>
      <Footer pageid="3"/>
      <Header/>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey', bgcolor: 'text.disabled', position: 'absolute',left:0, top:0, width:'100%', height:'25%'}}>
      <Box sx={{position: 'absolute', right:'3%', bottom:'3%', height:'25%', fontSize:"middle"}}>
      {/* change takamura --> */}
        {/* <UploadButtons><AddAPhotoIcon/></UploadButtons> */}
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" className="form-control" onChange={this.onChangeImage}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AddAPhotoIcon />
          </IconButton>
        </label>
        </Stack>
      {/* <-- change takamura */}
      </Box>
      </Box>

      <Box sx={{position: 'absolute', left:'50%', top:'20%'}}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}//緑のアイコンの位置
        variant="dot"
      >
        {/* change takamura */}
        {/* <Avatar alt="Me"src={default_icon} sx={{ width: 56, height: 56 }}/> */}
        <Avatar alt="Me" src={this.state.imageurl} sx={{ width: 56, height: 56 }}/>
        
      </StyledBadge>
      </Box>

      <Paper sx={{position:'absolute', bottom:'55px', width:'100%'}}>
        <MenuList>
          <Divider />
          <MenuItem>
            <ListItemText align="left">Change Email</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText align="left">Change Password</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText align="left">Notifications</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText align="left">Change Theme</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText align="left">Help</ListItemText>
          </MenuItem>
          <Divider />
          <Link to='/loginpage'>
          <MenuItem>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
          </Link>
        </MenuList>
      </Paper>
      </ThemeProvider>
    );
  }
}
export default withRouter(SettingsPageHT) // 画面遷移対象にするので、withRoute()を使う
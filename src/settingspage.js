import React from 'react'
import { Component }        from 'react';
import { withRouter }       from 'react-router-dom';              // router (画面遷移制御)機能
import { Link, useHistory } from 'react-router-dom';
import { Storage }          from 'aws-amplify';

// material ui
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
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

// アプリ用css, component
import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import Header from "./components/header";
import Footer from "./components/footer";
//import default_icon       from './img/default_icon.jpg'   // settingspageに表示する顔写真

import { CognitoUserPool } from "amazon-cognito-identity-js"
import awsConfiguration    from './awsConfiguration'
const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId:   awsConfiguration.ClientId,
})


const Input = styled('input')({
  display: 'none',
});

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
    this.onChangeImage = this.onChangeImage.bind(this);
    const cognitoUser = userPool.getCurrentUser()
    var username_init = "default_user";
    if (cognitoUser) {
      username_init = cognitoUser.username;
    }
    this.state = {
      imagefilename: "",
      imageurl: this.props.location.state.imageurl,
      username: username_init,
      members: this.props.location.state.members
    };
    //console.log(this.state.members);
  }
  
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
      this.save();
    }
  }
  
  // me の data をDB(kzmember table)に保存する
  save() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify( {"userid":this.state.username,
                                "memberid":0,  // meのimageは memberid=0 として登録する
                                "membername":"me",
                                "imagefile":this.state.imagefile,
                                "imageurl":this.state.imageurl,
                                "score": 0
                            } );
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://z52l9dtggi.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .catch(error => console.log('error', error));

  }


  render() {
    return (
      <ThemeProvider theme={theme}>
      <Footer pageid="3"/>
      <Header/>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey', bgcolor: 'text.disabled', position: 'absolute',left:0, top:0, width:'100%', height:'25%'}}>
      <Box sx={{position: 'absolute', right:'3%', bottom:'3%', height:'25%', fontSize:"middle"}}>
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" className="form-control" onChange={this.onChangeImage}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AddAPhotoIcon />
          </IconButton>
        </label>
        </Stack>
      </Box>
      </Box>

      <Box sx={{position: 'absolute', left:'50%', top:'20%'}}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}//緑のアイコンの位置
        variant="dot"
      >
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
export default withRouter(SettingsPage) // 画面遷移対象にするので、withRoute()を使う
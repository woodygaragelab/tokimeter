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

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Box,TextField,Button } from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ListItemText from '@mui/material/ListItemText';

import { CognitoUserPool } from "amazon-cognito-identity-js"
import awsConfiguration    from './awsConfiguration'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId:   awsConfiguration.ClientId,
})
const cognitoUser = userPool.getCurrentUser();
var username_init = "default_user";
if (cognitoUser) {
  username_init = cognitoUser.username;
}
console.log("cognitoUser=",cognitoUser)
console.log("username_init=",username_init)


const Input = styled('input')({
  display: 'none',
});

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

class RegisterPage extends Component {   // RegisterPage:設定ページ
  constructor(props){                    // props: RegisterPageコンポネントが受け取るパラメータ
    super(props);
    this.onChangeMemberName = this.onChangeMemberName.bind(this);
    this.onChangeImage      = this.onChangeImage.bind(this);
    this.state = {
      memberid: this.props.location.state.memberid,
      membername: "",
      imagefile: "",
      imageurl: "",
      score: 0.5,
      username: username_init
    };
  }
  
  onChangeMemberName(e) {
    if (!e.target) return
    const membername = e.target.value;
    this.setState({membername: membername });
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
      this.setState({username: username_init});

    }
  }

  save() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify( {"userid":this.state.username,
                                "memberid":this.state.memberid, 
                                "membername":this.state.membername, 
                                "imagefile":this.state.imagefile,
                                "imageurl":"",
                                "score": this.state.score
                            } );
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch("https://z52l9dtggi.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .catch(error => console.log('error', error));

    this.props.history.push({ pathname: '/homepage' });  // homepageに戻る
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Footer pageid="3"/>
      <Header/>
      <Box sx={{position: 'absolute', left:'42%', top:'20%', fontSize:"middle"}}>
        <TextField onChange={this.onChangeMemberName}
          label="name" // 5/2 入力データを保存するように修正
        />
      </Box>
      <Box sx={{position: 'absolute', left:'47%', top:'50%', fontSize:"middle"}}>
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" className="form-control" onChange={this.onChangeImage}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <ListItemText>Add Photo</ListItemText>
          </IconButton>
        </label>
        </Stack>
      </Box>

      <Box sx={{position: 'absolute', left:'45%', top:'30%'}}>
        <Avatar alt="Me" src={this.state.imageurl} sx={{ width: 120, height: 120 }}/>
      </Box>

      <Box sx={{position: 'absolute', left:'47%', top:'70%'}}>
      <Button id='saveButton' onClick={() => this.save()} variant="contained" color="secondary" style={{ width: '100%' }}>
        Save
      </Button>
    </Box>

      </ThemeProvider>
    );
  }
}
export default withRouter(RegisterPage) // 画面遷移対象にするので、withRoute()を使う
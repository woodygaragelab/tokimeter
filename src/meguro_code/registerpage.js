import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { Storage } from 'aws-amplify';

import { Link, useHistory } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import '../App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "../components/header";
import Footer from "../components/footer";

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Box,TextField,Button } from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ListItemText from '@mui/material/ListItemText';

const Input = styled('input')({
  display: 'none',
});

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

class RegisterPage extends Component {       // RegisterPage:設定ページ
  constructor(props){                    // props: RegisterPageコンポネントが受け取るパラメータ
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.state = {
      imagefilename: "",
      imageurl: ""
    };
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
    }
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
      <Footer pageid="3"/>
      <Header/>
      <Box sx={{position: 'absolute', left:'42%', top:'20%', fontSize:"middle"}}>
      <TextField
          label="name" //3/24 テキストフィールドを表示させているだけの状態(入力データは保存されない)
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
      <Button
              id='saveButton'   
              //onClick={selectHome} 3/24 Saveボタンを押してもホーム画面に戻るだけ（入力データは保存されない）
              variant="contained" color="secondary" style={{ width: '100%' }}>
              Save
            </Button>
        </Box>

      </ThemeProvider>
    );
  }
}
export default withRouter(RegisterPage) // 画面遷移対象にするので、withRoute()を使う
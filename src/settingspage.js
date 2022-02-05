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

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

class SettingsPage extends Component {       // HomePage:メインページ
  constructor(props){                    // props: HomePageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: HomePageコンポネントが保持するデータ
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
      </ThemeProvider>

    );
  }
}
export default withRouter(SettingsPage) // 画面遷移対象にするので、withRoute()を使う
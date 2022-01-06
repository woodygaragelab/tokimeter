import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header1 from "./components/header1";
import Footer2 from "./components/footer2";

import img1 from './img/me.png'   // homepageに表示する顔写真
import img2 from './img/jimin2.jpg'
import img3 from './img/jin.jpg'
import img4 from './img/jungkook.jpg'
import img5 from './img/songkang.jpg'

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});



class HomePage2 extends Component {       // HomePage:メインページ
  constructor(props){                    // props: HomePageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: HomePageコンポネントが保持するデータ
  }

  
  // pathname:xxxに遷移する。遷移先のコンポネントはApp.jsのRouteで設定　
  selectGraph = () => {  this.props.history.push({ pathname: '/graphpage' });  }
  selectText  = () => {  this.props.history.push({ pathname: '/textpage' });  }
  selectHeart = () => {  this.props.history.push({ pathname: '/heartpage' });  }
  selectUser  = () => {  this.props.history.push({ pathname: '/userpage' });  }

  // 画面描画処理。 htmlを生成してreturnすると、Reactが描画する。
  render() {

    return (
      <ThemeProvider theme={theme}>
      <Header1 />

      <Box sx={{height:500}} border={1} >
        <Box sx={{height:100, width:100, position: 'absolute', top: 200, left:200}}>
          <img src={img1} className="kzImage2" alt="img1"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 100, left:50}} >
          <img src={img2} className="kzImage2" alt="img2"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 100, left:350}} >
          <img src={img3} className="kzImage2" alt="img3"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 300, left:100}} >
          <img src={img4} className="kzImage2" alt="img4"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 350, left:300}} >
          <img src={img5} className="kzImage2" alt="img5"/>
        </Box>
      </Box>
      <Footer2 /> 
      </ThemeProvider>

    );
  }
}
export default withRouter(HomePage2) // 画面遷移対象にするので、withRoute()を使う
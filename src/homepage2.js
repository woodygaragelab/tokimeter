import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header1 from "./components/header1";
import Footer2 from "./components/footer2";
import img1_me from './img/me.png'   // homepageに表示する顔写真
import img2_jimin    from './img/jimin2.jpg'
import img3_jin      from './img/jin2.jpeg'
import img4_jungkook from './img/jungkook.jpg'
import img5_v        from './img/v.jpg'
import img6_rm       from './img/rm.jpg'
import img7_jhope from './img/jhope.jpg'
import img8_suga from './img/suga.jpg'
import img9_songkang from './img/songkang.jpg'

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

      <Box sx={{height:800}}>
        <Box sx={{height:100, width:100, position: 'absolute', top: 200, left:200}}>
          <img src={img1_me} className="kzImage2" alt="img1_me"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 100, left:50}} >
          <img src={img2_jimin} className="kzImage2" alt="img2_jimin"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 80, left:250}} >
          <img src={img3_jin} className="kzImage2" alt="img3_jin"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 250, left:400}} >
          <img src={img4_jungkook} className="kzImage2" alt="img4_jungkook"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 250, left:40}} >
          <img src={img5_v} className="kzImage2" alt="img5_v"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 450, left:420}} >
          <img src={img6_rm} className="kzImage2" alt="img6_rm"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 350, left:180}} >
          <img src={img7_jhope} className="kzImage2" alt="img7"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 520, left:80}} >
          <img src={img8_suga} className="kzImage2" alt="img8"/>
        </Box>
        <Box sx={{height:100, width:100, position: 'absolute', top: 400, left:300}} >
          <img src={img9_songkang} className="kzImage2" alt="img9_songkang"/>
        </Box>
      </Box>
      <Footer2/> 
      </ThemeProvider>

    );
  }
}
export default withRouter(HomePage2) // 画面遷移対象にするので、withRoute()を使う
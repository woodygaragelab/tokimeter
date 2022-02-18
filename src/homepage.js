import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
import { useRef } from 'react'; 

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "./components/header";
import Footer from "./components/footer";
import default_icon       from './img/default_icon.jpg'   // homepageに表示する顔写真
import img2_jimin    from './img/jimin2.jpg'
import img3_jin      from './img/jin2.jpg'
import img4_jungkook from './img/jungkook.jpg'
import img5_v        from './img/v.jpg'
import img6_rm       from './img/rm.jpg'
import img7_jhope    from './img/jhope.jpg'
import img8_suga     from './img/suga.jpg'

import useSound from 'use-sound';
import Sound from './sound/buttonsound_37.mp3';

import { Link, useHistory } from 'react-router-dom';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});
  
const HomePage = () => {

  const [score_0, setScore] = useState(50)
  const [play, { stop, pause }] = useSound(Sound);
  const [playLoud] = useSound(Sound, { volume: 2 });
  
  const clickA = () => {
    setScore(score_0+50);
    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }

    // context.resume();
    play();
  };

  // const context = new AudioContext();
  // useEffect(() => {
  // }, [])
  
  const audioContext = useRef(null);
  useEffect(() => {
    audioContext.current = new AudioContext();
  }, []);

    return (
      <ThemeProvider theme={theme}>
      <Header/>
      <Box sx={{height:800}}>
        <Link to='/settingspage'>
        <Box sx={{height:100, width:100, position: 'absolute', top: '50%', left:'50%'}}>
          <img src={default_icon} className="kzImage2" alt="default_icon" onClick={() => clickA()}/>
          {/* <button onClick={() => clickA()}>add score</button> */}
          {/* <button onClick={() => play()}>声を聴く</button> */}
        </Box>
        </Link>
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
      </Box>
      <Footer pageid="1"/> 
      </ThemeProvider>

    );
  }
// }
export default withRouter(HomePage) // 画面遷移対象にするので、withRoute()を使う
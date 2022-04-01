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

import default_icon  from './img/default_icon.jpg'   // homepageに表示する顔写真
import img_circle    from './img/circle.png' 
import img2_jimin    from './img/jimin2.jpg'
import img3_jin      from './img/jin2.jpg'
import img4_jungkook from './img/jungkook.jpg'
import img5_v        from './img/v.jpg'
import img6_rm       from './img/rm.jpg'
import img7_jhope    from './img/jhope.jpg'
import img8_suga     from './img/suga.jpg'
import img9_songkang from './img/songkang.jpg'


import AddCircleIcon from '@mui/icons-material/AddCircle';

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

  const x_me    = 400;        // meのx座標(left)
  const y_me    = 300;        // meのy座標(top)
  const size_me = 100;        // meの大きさ(width,height)
  const distance_init = 300;  // meとの距離の初期値(score=0の時の距離)
  const circle_dia = 200;     // meの周りの同心円の直径の初期値
  const circle_amp = 50;      // meの周りの同心円の直径の振幅
  
  const persons_init = [      // personのリストの初期値
          {id:0, img:img2_jimin,    score:0.25, dir:45},
          {id:1, img:img3_jin,      score:0.25, dir:90},
          {id:2, img:img4_jungkook, score:0.25, dir:135},
          {id:3, img:img5_v,        score:0.25, dir:180},
          {id:4, img:img6_rm,       score:0.25, dir:225},
          {id:5, img:img7_jhope,    score:0.25, dir:270},
          {id:6, img:img8_suga,     score:0.25, dir:315},
          {id:7, img:img9_songkang, score:0.25, dir:360},      
        ];
  const [persons, setPersons] = useState(persons_init);  // personのデータ
  const images_init = [                                    
    {id:0, img:img2_jimin,    x:0, y:0, dir:0},
  ]
  const circle_init = { img:img_circle, x:x_me, y:y_me, size:circle_dia, dir:0}
  const [images,   setImages]   = useState(images_init); // 表示用のimages。personsから作る
  const [play, { stop, pause }] = useSound(Sound);

  const [datetime, setDateTime] = useState(new Date());  
  const [circle,   setCircle]   = useState(circle_init);  

  const [score_0, setScore] = useState(50)
  const [playLoud] = useSound(Sound, { volume: 2 });



  
  const clickA = () => {
    //setScore(score_0+50);
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
      <Link to='/registerpage'>
        <Box sx={{fontSize:'large', position: 'absolute', bottom:'12%' , right:'5%'}} >
          <AddCircleIcon/>
        </Box>
        </Link>
      <Footer pageid="1"/> 
      </ThemeProvider>

    );
  }
// }
export default withRouter(HomePage) // 画面遷移対象にするので、withRoute()を使う
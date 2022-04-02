import React from 'react'
import { Component } from 'react';
import { useState }  from 'react';                        // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                        // effect (state変化したときの処理機能)
import { useRef }    from 'react';   

import { withRouter }       from 'react-router-dom';              // router (画面遷移制御)機能
import { Link, useHistory } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { pink, purple }               from '@mui/material/colors';

import { Box }                        from '@material-ui/core';

import '../App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "../components/header";
import Footer from "../components/footer";

import img_circle    from '../img/circle.png' 
import img1_me       from '../img/me.png'   // homepageに表示する顔写真
import img2_jimin    from '../img/jimin2.jpg'
import img3_jin      from '../img/jin2.jpg'
import img4_jungkook from '../img/jungkook.jpg'
import img5_v        from '../img/v.jpg'
import img6_rm       from '../img/rm.jpg'
import img7_jhope    from '../img/jhope.jpg'
import img8_suga     from '../img/suga.jpg'
import img9_songkang from '../img/songkang.jpg'

import AddCircleIcon from '@mui/icons-material/AddCircle';

import useSound      from 'use-sound';
import Sound         from '../sound/buttonsound_37.mp3';


const theme = createTheme({ 
  palette: {
    primary:   { main: purple[500],  },
    secondary: { main: pink[300], },
  },
});

const HomePage = () => {

  const x_me          = 400;  // meのx座標(left)
  const y_me          = 300;  // meのy座標(top)
  const size_me       = 100;  // meの大きさ(width,height)
  const distance_init = 500;  // meとの距離の初期値(score=0の時の距離)
  const circle_dia    = 200;  // meの周りの同心円の直径の初期値
  const circle_amp    = 50;   // meの周りの同心円の直径の振幅
  
  const persons_init = [      // personのリストの初期値
          {id:0, img:img2_jimin,    score:0.6, dir:45},
          {id:1, img:img3_jin,      score:0.4, dir:90},
          {id:2, img:img4_jungkook, score:0.1, dir:135},
          {id:3, img:img5_v,        score:0.2, dir:180},
          {id:4, img:img6_rm,       score:0.1, dir:225},
          {id:5, img:img7_jhope,    score:0.1, dir:270},
          {id:6, img:img8_suga,     score:0.1, dir:315},
          {id:7, img:img9_songkang, score:0.6, dir:360},      
        ];
  const [persons, setPersons] = useState(persons_init);  // personのデータ
  const images_init = [                                    
    {id:0, img:img2_jimin,    x:0, y:0, dir:0},
    {id:1, img:img3_jin,      x:0, y:0, dir:45},
    {id:2, img:img4_jungkook, x:0, y:0, dir:90},
    {id:3, img:img5_v,        x:0, y:0, dir:135},
    {id:4, img:img6_rm,       x:0, y:0, dir:180},
    {id:5, img:img7_jhope,    x:0, y:0, dir:225},
    {id:6, img:img8_suga,     x:0, y:0, dir:270},
    {id:7, img:img9_songkang, x:0, y:0, dir:315},      
  ]
  const circle_init = { img:img_circle, x:x_me, y:y_me, size:circle_dia, dir:0}
  const [images,   setImages]   = useState(images_init); // 表示用のimages。personsから作る
  const [play, { stop, pause }] = useSound(Sound);

  const [datetime, setDateTime] = useState(new Date());  
  const [circle,   setCircle]   = useState(circle_init);  
  
  useEffect(() => {                            // 描画後の処理。タイマーでデータを定期更新する。
    moveImage();                               // imageを動かす
    const interval = setInterval(() => {       // timerをセットして、繰り返し実行する
        setDateTime(new Date());               // datetimeを更新
      }, 20);                                    // ミリ秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行

  const clickA = () => {
    play();
  };

  const clickC = (index) => {
    let persons_new = [...persons];  // personsのコピーを作ってから更新する
    persons_new[index].score = 1.0-(1.0-persons_new[index].score)*0.8; // scoreの更新
    setPersons(persons_new);  // コピーを新たにセットしないと、更新が反映しない（描画されない）
  };

  const clickD = () => {
    setPersons(persons_init);  // データのリセット
    setCircle(circle_init);
  };

  const moveImage = () => {                                // imageの表示位置を動かす

    let images_new = images.map((image,index)=>{      // imageのリストを personsからmapして作成する
      let image_new = {"id":image.id, "img":image.img, "dir":image.dir}; // imgはpersonからコピー
      let dd        = Math.sin(Math.PI / 45 * image.dir) * 0.2;          // meとの距離の振動変位
      let score     = persons[index].score; 
      let distance  = distance_init * (1.0 + dd) * (1.0-score*score);    // meとの距離
      image_new.dir = image.dir + 0.3;                                   // 表示位置角度を進める

      let dx = distance * Math.cos(Math.PI / 180 * image.dir);           // meとの距離(x座標)
      let dy = distance * Math.sin(Math.PI / 180 * image.dir) * -1.0;    // meとの距離(y座標)(上下逆)
      image_new.x = x_me+dx;                                             // imageのx座標(left)
      image_new.y = y_me+dy;                                             // imageのy座標(top)
      return image_new;
    });
    setImages(images_new);

    // meの周りの同心円を直径を変えて表示
    let circle_new      = {...circle};                                    // 現在の円をコピー
    circle_new.dir      = circle.dir + 1;                                 // 振動の角度を1°進める
    let ds              = Math.sin(Math.PI/45 * circle.dir) * circle_amp; // 円直径の振幅
    circle_new.size     = circle_dia + ds;                                // 円直径
    circle_new.x        = x_me + size_me/2 - circle_new.size/2;           // 円のleft x座標
    circle_new.y        = y_me + size_me/2 - circle_new.size/2;           // 円のtop  y座標
    setCircle(circle_new);
  };

    return (
      <ThemeProvider theme={theme}>
      <Header/>
      <Box sx={{height:400, background:theme.palette.primary}}>

        {/* 同心円(circle)を配置する */}
        <Box sx={{height:circle.size, width:circle.size, position: 'absolute', left:circle.x, top: circle.y}}>
          <img src={circle.img} height="100%" width="100%" alt="circle"/>
        </Box>
        {/* meを配置する */}
        <Link to='/settingspage'>
          <Box sx={{height:size_me, width:size_me, position: 'absolute', left:x_me, top: y_me}}>
            <img src={img1_me} className="kzImage2" alt="img1_me" onClick={() => clickA()}/>
          </Box>
        </Link>

        {/* person imgageを配置する */}
        {images.map((image, index) => (
          <Box key={image.id} sx={{height:100, width:100, position:'absolute', left:image.x, top:image.y }} >
            <img src={image.img} className="kzImage2" alt="imgX" onClick={() => clickC(index)}/>
          </Box>
        ))}

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

// old code
// useEffect(() => {
//   persons.forEach((person,index)=>{
//     let distance = distance_init * (1.0 - person.score);
//     let dx = distance * Math.sin(Math.PI / 360 * person.dir);
//     let dy = distance * Math.cos(Math.PI / 360 * person.dir);
//     person.x = x_me-dx;
//     person.y = y_me+dy;
//     console.log("person.id="+person.id);
//     console.log("person.score="+person.score);
//     console.log("distance="+distance);
//     console.log("dx="+dx);
//     console.log("dy="+dy);
//     console.log("person.x="+person.x);
//     console.log("person.y="+person.y);
//     persons[index] = person;
//   });
//   //let persons_new = [...persons];
  
//   setPersons(persons);
// },[persons])




//
// import useSound from 'use-sound';
// import Sound from '../sound/jimin_bwl.mp3';
// const [play, { stop, pause }] = useSound(Sound);

// const audioContext = useRef(null);
// useEffect(() => {
//   audioContext.current = new AudioContext();
// }, []);

// const clickA = () => {
//   if (audioContext.current.state === "suspended") {
//     audioContext.current.resume().then(() => {
//       console.log('Playback resumed successfully');
//       play();
//     });
//   }
// };

// old code
//
// const clickA = () => {
//   setScore(score_0+50);
//   if (audioContext.current.state === "suspended") {
//     audioContext.current.resume();
//   }

//   // context.resume();
//   play();
// };

// // const context = new AudioContext();
// // useEffect(() => {
// // }, [])

// const audioContext = useRef(null);
// useEffect(() => {
//   audioContext.current = new AudioContext();
// }, []);

//const [playLoud] = useSound(Sound, { volume: 1 });
  
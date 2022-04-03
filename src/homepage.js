import React from 'react'
import { Component }  from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useState }   from 'react';                         // state（コンポネント単位のデータ保存機能）
import { useEffect }  from 'react';                         // effect (state変化したときの処理機能)
import { useRef }     from 'react'; 

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
    primary:   { main: '#f8bbd0',  },  // pink[100]=#f8bbd0
    secondary: { main: pink[300], },
  },
});
  
const HomePage = () => {

  const x_me          = 400;     // meのx座標(left)
  const y_me          = 300;     // meのy座標(top)
  const size_me       = 100;     // meの大きさ(width,height)
  const distance_init = 300;     // meとの距離の初期値(score=0の時の距離)
  const circle_dia    = 200;     // meの周りの同心円の直径の初期値
  const circle_amp    = 50;      // meの周りの同心円の直径の振幅
  
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
    {id:0, img:img2_jimin,    x:100, y:50,  dir:0},
    {id:1, img:img3_jin,      x:600, y:50,  dir:45},
    {id:2, img:img4_jungkook, x:200, y:100, dir:90},
    {id:3, img:img5_v,        x:500, y:100, dir:135},
    {id:4, img:img6_rm,       x:100, y:250, dir:180},
    {id:5, img:img7_jhope,    x:600, y:250, dir:225},
    {id:6, img:img8_suga,     x:100, y:400, dir:270},
    {id:7, img:img9_songkang, x:600, y:400, dir:315},      
  ]
  const circle_init = { img:img_circle, x:x_me, y:y_me, size:circle_dia, dir:0}
  const [images,   setImages]   = useState(images_init); // 表示用のimages。personsから作る

  const [play, { stop, pause }] = useSound(Sound);

  const [datetime, setDateTime] = useState(new Date());  
  const [circle,   setCircle]   = useState(circle_init);  
  
  const clickA = () => {
    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }
    play();
  };
  const clickC = (index) => {
    let persons_new = [...persons];  // personsのコピーを作ってから更新する
    persons_new[index].score = 1.0-(1.0-persons_new[index].score)*0.8; // scoreの更新
    setPersons(persons_new);  // コピーを新たにセットしないと、更新が反映しない（描画されない）
  };

  const audioContext = useRef(null);
  useEffect(() => {
    audioContext.current = new AudioContext();
  }, []);

  useEffect(() => {                            // 描画後の処理。タイマーでデータを定期更新する。
    moveImage();                               // imageを動かす
    const interval = setInterval(() => {       // timerをセットして、繰り返し実行する
        setDateTime(new Date());               // datetimeを更新
      }, 20);                                    // ミリ秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行

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
      <Box sx={{height:800}}>
        {/* 同心円(circle)を配置する */}
        <Box sx={{height:circle.size, width:circle.size, position: 'absolute', left:circle.x, top: circle.y}}>
          <img src={circle.img} height="100%" width="100%" alt="circle"/>
        </Box>
        {/* meを配置する */}
        <Link to='/settingspage'>
          <Box sx={{height:size_me, width:size_me, position: 'absolute', left:x_me, top: y_me}}>
            <img src={default_icon} className="kzImage2" alt="img1_me" onClick={() => clickA()}/>
          </Box>
        </Link>
        {/* person imgageを配置する */}
        {images.map((image, index) => (
          <Box key={image.id} sx={{height:100, width:100, position:'absolute', left:image.x, top:image.y }} >
            <img src={image.img} className="kzImage2" alt="imgX" onClick={() => clickC(index)}/>
          </Box>
        ))}

        {/* <Box sx={{height:100, width:100, position: 'absolute', top: 100, left:50}} >
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
        </Box> */}

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
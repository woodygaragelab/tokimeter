import React from 'react'
//import { Component }  from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useState }   from 'react';                         // state（コンポネント単位のデータ保存機能）
import { useEffect }  from 'react';                         // effect (state変化したときの処理機能)
import { useRef }     from 'react'; 
import { Storage }    from 'aws-amplify';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import '../App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "../components/header";
import Footer from "../components/footer";

import default_icon  from '../img/default_icon.jpg'   // homepageに表示する顔写真
import img_circle    from '../img/circle.png' 

import AddCircleIcon from '@mui/icons-material/AddCircle';

import useSound from 'use-sound';
import Sound from '../sound/buttonsound_37.mp3';

import { Link, useHistory } from 'react-router-dom';

const theme = createTheme({ 
  palette: {
    primary:   { main: '#f8bbd0',  },  // pink[100]=#f8bbd0
    secondary: { main: pink[300], },
  },
});
  
const HomePage = (props) => {

  const x_me          = 400;     // meのx座標(left)
  const y_me          = 300;     // meのy座標(top)
  const size_me       = 100;     // meの大きさ(width,height)
  const distance_init = 300;     // meとの距離の初期値(score=0の時の距離)
  const circle_dia    = 200;     // meの周りの同心円の直径の初期値
  const circle_amp    = 50;      // meの周りの同心円の直径の振幅
  
  const [members, setMembers]   = useState([]); // memberのデータ
  const [images,   setImages]   = useState([]); // 表示用のimages。membersから作る

  const circle_init = { img:img_circle, x:x_me, y:y_me, size:circle_dia, dir:0}
  const [circle,   setCircle]   = useState(circle_init);  

  const [play, { stop, pause }] = useSound(Sound);

  const [datetime, setDateTime] = useState(new Date());  
  
  const getMembers = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"userid":"woody"});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch(" https://hxejb9ahd9.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
      //console.log(apiData);
      apiData.map(async item => {
        if (item.imagefile) {
          // imageFile名からimageUrlを取得する
          let dataExpireSeconds = (3 * 60);
          const imageurl = await Storage.get(item.imagefile, { expires: dataExpireSeconds });
          item.imageurl = imageurl;
          setMembers(apiData);
          return item;    
        }
        return item;    
      })
    })
    .catch(error => console.log('error', error));
  };

  const clickA = () => {
    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }
    play();
  };
  const clickC = (index) => {
    let members_new = [...members];  // membersのコピーを作ってから更新する
    members_new[index].score = 1.0-(1.0-members_new[index].score)*0.8; // scoreの更新
    setMembers(members_new);  // コピーを新たにセットしないと、更新が反映しない（描画されない）
  };

  const audioContext = useRef(null);
  useEffect(() => {
    getMembers();
    audioContext.current = new AudioContext();
  }, []);

  useEffect(() => {                            // 描画後の処理。タイマーでデータを定期更新する。
    moveImage();                               // imageを動かす
    const interval = setInterval(() => {       // timerをセットして、繰り返し実行する
        setDateTime(new Date());               // datetimeを更新
      }, 20);                                  // ミリ秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行

  useEffect(() => {            // membersが更新されたらimagesを更新する
    let images_new = members.map((member,index)=>{   
      let image_new = {"id":member.memberid, "imageurl":member.imageurl,
                     "dir":member.memberid*45, "score":member.score}; 
      return image_new;
    });
    setImages(images_new);
  }, [members]);             

  const moveImage = () => {                                // imageの表示位置を動かす
    //console.log("members=",members);
    //console.log("images=",images);

    let images_new = images.map((image,index)=>{      // imageのリストをcopyして更新する
      let image_new = {"id":image.id, "imageurl":image.imageurl,
                       "dir":image.dir, "score":image.score}; // imageをコピーする
      image_new.imageurl = members[index].imageurl; // image urlはmembersから再度取得する。非同期で遅れて更新されるので 
      let dd        = Math.sin(Math.PI/180 * image.dir * 4) * 0.2;      // meとの距離の振動変位
      let score     = image.score; 
      let distance  = distance_init * (1.0 + dd) * (1.0-score*score);    // meとの距離
      image_new.dir = image.dir + 0.1;                                   // 表示位置角度を進める

      let dx = distance * Math.cos(Math.PI/180 * image.dir);           // meとの距離(x座標)
      let dy = distance * Math.sin(Math.PI/180 * image.dir) * -1.0;    // meとの距離(y座標)(上下逆)
      image_new.x = x_me+dx;                                           // imageのx座標(left)
      image_new.y = y_me+dy;                                           // imageのy座標(top)
      return image_new;
    });
    setImages(images_new);

    // meの周りの同心円を直径(size)を変化（振動）させて表示。直径の変化は三角関数で計算する
    let circle_new      = {...circle};                                    // 現在の円をコピー
    circle_new.dir      = circle.dir + 5;                                 // 振動の角度を5°進める
    let ds              = Math.sin(Math.PI/180 * circle_new.dir) * circle_amp; // 円直径の振幅
    circle_new.size     = circle_dia + ds;                                // 円直径
    circle_new.x        = x_me + size_me/2 - circle_new.size/2;  // 円の座標
    circle_new.y        = y_me + size_me/2 - circle_new.size/2;  // 円とmeの中心が一致するように計算
    setCircle(circle_new);
  };

  const addMember = () => {                   // memberを追加する
    props.history.push({
      pathname: '/registerPageHT',
      state: {  memberid:members.length+1  }  // memberid=現人数+1
    });
  }



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
        {/* member imgageを配置する */}
        {images.map((image, index) => (
          <Box key={image.id} sx={{height:100, width:100, position:'absolute', left:image.x, top:image.y }} >
            <img src={image.imageurl} className="kzImage2" alt="imgX" onClick={() => clickC(index)}/>
          </Box>
        ))}

      </Box>

      <Box sx={{fontSize:'large', position: 'absolute', bottom:'12%' , right:'15%'}} >
          <AddCircleIcon  onClick={() => getMembers()}/>
      </Box>
      {/* <Link to='/registerpageHT'> */}
        <Box sx={{fontSize:'large', position: 'absolute', bottom:'12%' , right:'5%'}} >
          <AddCircleIcon onClick={()=>addMember()} />
        </Box>
      {/* </Link> */}
      <Footer pageid="1"/> 
      </ThemeProvider>

    );
  }
// }
export default withRouter(HomePage) // 画面遷移対象にするので、withRoute()を使う

// old code
// import img2_jimin    from '../img/jimin2.jpg'
// import img3_jin      from '../img/jin2.jpg'
// import img4_jungkook from '../img/jungkook.jpg'
// import img5_v        from '../img/v.jpg'
// import img6_rm       from '../img/rm.jpg'
// import img7_jhope    from '../img/jhope.jpg'
// import img8_suga     from '../img/suga.jpg'
// import img9_songkang from '../img/songkang.jpg'
// const member_init = [      // memberのリストの初期値
//       {id:0, imageurl:img2_jimin,    score:0.6}, 
//       {id:1, imageurl:img3_jin,      score:0.4},
//       {id:2, imageurl:img4_jungkook, score:0.1},
//       {id:3, imageurl:img5_v,        score:0.2},
//       {id:4, imageurl:img6_rm,       score:0.1},
//       {id:5, imageurl:img7_jhope,    score:0.1},
//       {id:6, imageurl:img8_suga,     score:0.1},
//       {id:7, imageurl:img9_songkang, score:0.6},
//     ];
//const [members, setMembers] = useState(member_init);  // memberのデータ
// const images_init = members.map((member)=>{
//   return {id:member.id, imageurl:member.imageurl, dir:member.id*45, x:0, y:0};
// })

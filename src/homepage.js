import React from 'react'
import { useState, useEffect, useRef } from 'react';                        
import { withRouter }                  from 'react-router-dom';  // router (画面遷移制御)機能
//import { Link }                        from 'react-router-dom';
import { Storage }                     from 'aws-amplify';

import { ThemeProvider, createTheme }  from '@material-ui/core/styles';
import pink                            from '@material-ui/core/colors/pink';
import { Box }                         from '@material-ui/core';
import AddCircleIcon                   from '@mui/icons-material/AddCircle';
import SyncIcon                        from '@mui/icons-material/Sync';

import useSound                        from 'use-sound';
import Sound                           from './sound/buttonsound_37.mp3';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header        from "./components/header";
import Footer        from "./components/footer";
import default_icon  from './img/default_icon.jpg'   // homepageに表示する顔写真
import img_circle    from './img/circle.png' 
import { CognitoUserPool } from "amazon-cognito-identity-js"
import awsConfiguration    from './awsConfiguration'
const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId:   awsConfiguration.ClientId,
})

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

  
  const cognitoUser             = userPool.getCurrentUser();
  var username_init             = "default_user";
  if (cognitoUser) {
    username_init = cognitoUser.username;
  };
  const [username,setUserName]  = useState(username_init);  
  const [img_me,  setImgMe]     = useState(default_icon); // me用のimages

  const [members, setMembers]   = useState([]); // memberのデータ
  const [names,   setNames]     = useState([]); // 名前選択用のname list。membersから作る
  const [images,  setImages]    = useState([]); // 表示用のimages。membersから作る
  
  const [datetime, setDateTime] = useState(new Date());  

  const circle_init = { img:img_circle, x:x_me, y:y_me, size:circle_dia, dir:0}
  const [circle,   setCircle]   = useState(circle_init);  


  const [play] = useSound(Sound);   // Sound(音声ファイル)を再生する関数(play)を設定する。
   
  const getMembers = () => {        // serverからmember listを取得する関数
    var myHeaders      = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw            = JSON.stringify({"userid":username});
    var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
    fetch(" https://hxejb9ahd9.execute-api.ap-northeast-1.amazonaws.com/dev/", requestOptions)
    .then(response => response.text())
    .then(async(response) => {
      const apiData = JSON.parse(response);
      //console.log(apiData);
      apiData.forEach(async item => {
        if (item.imagefile) {
            // imageFile名からアクセス用imageUrlを取得する. 有効期間=180 秒
            item.imageurl = await Storage.get(item.imagefile, { expires: 180 });
            if (item.memberid == 0) {        // me用のimage urlを保存する
              setImgMe(item.imageurl);
            }
        }
      })
      // member だけfilterする。 
      var memberData = apiData.filter(function(member) {
        return member.memberid !== 0;                    // memberid=0(me)はmemberDataに入れない
      });
      setMembers(memberData);
      // name listを作る
      var nameList = apiData.map(function(member) {
        return member.membername;                
      });
      //console.log(nameList);
      setNames(nameList);
    })
    .catch(error => console.log('error', error));
  };

  const clickA = () => {                            // クリックしたら音を鳴らす（テスト用）
    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();                // 音声を再生する
    }
    play();
    props.history.push({
      pathname: '/settingspage',
      state: {  imageurl:img_me, members:members }  // meのimageurlを渡す
    });
  };

  const clickC = (index) => {        // member のimageをclickしたら、scoreを増やす
    let members_new = [...members];  // membersのコピーを作ってから更新する
    members_new[index].score = 1.0-(1.0-members_new[index].score)*0.8; // scoreの更新
    setMembers(members_new);  // コピーを新たにセットしないと、更新が反映しない（描画されない）
    //console.log(names);
  };

  const audioContext = useRef(null);
  useEffect(() => {
    //getMembers();                              // DB(server)からmember listを取得する
    audioContext.current = new AudioContext(); // 音声再生を初期設定する
  }, []);

  useEffect(() => {            // usernameが更新されたら、DB(server)からmember listを取得する
    getMembers();                             
  }, [username]);

  useEffect(() => {            // membersが更新されたらimagesを更新する
    let images_new = members.map((member)=>{   
      return {"id":member.memberid, "imageurl":member.imageurl,
              "dir":member.memberid*45, "score":member.score}; 
    });
    setImages(images_new);
  }, [members]);             

  useEffect(() => {                            // タイマーでimageを定期更新する。
    moveImage();                               // imageを動かす
    const interval = setInterval(() => {       // timerをセットして、繰り返し実行する
        setDateTime(new Date());               // datetimeを更新
      }, 20);                                  // ミリ秒ごと
    return () => clearInterval(interval);      // 再描画が終わったらinterval（タイマー）停止
  }, [datetime]);                              // datetimeが更新されたらこの関数(effect)を実行

  const moveImage = () => {                                // imageの表示位置を動かす関数

    let images_new = images.map((image,index)=>{           // 移動後のimageのリスト。元をcopyして更新する
      let image_new = {"id":image.id, "imageurl":image.imageurl,
                       "dir":image.dir, "score":image.score};               // imageをコピーする
      image_new.imageurl = members[index].imageurl; // image urlはmembersから再度取得する。非同期で遅れて更新されるので 
      let dd        = Math.sin(Math.PI/180 * image.dir * 4) * 0.2;          // meとの距離の振動変位
      let score     = image.score; 
      let distance  = distance_init * (1.0 + dd) * (1.0-score*score);       // meとの距離
      image_new.dir = image.dir + 0.1;                                      // 表示位置角度を進める
      let dx        = distance * Math.cos(Math.PI/180 * image.dir);         // meとの距離(x座標)
      let dy        = distance * Math.sin(Math.PI/180 * image.dir) * -1.0;  // meとの距離(y座標)(上下逆)
      image_new.x   = x_me+dx;                                              // imageのx座標(left)
      image_new.y   = y_me+dy;                                              // imageのy座標(top)
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
      pathname: '/registerPage',
      state: {  memberid:members.length+1  }  // memberid=現人数+1
    });
  }

  const changeMe = () => {                   // userを変更する（テスト用
    if (username == "default_user") {
      setUserName("27afe00e-2153-46bd-9387-00913700f18f");
    }
    else {
      setUserName("default_user");
    }
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
        {/* <Link to='/settingspage'> */}
          <Box sx={{height:size_me, width:size_me, position: 'absolute', left:x_me, top: y_me}}>
            <img src={img_me} className="kzImage2" alt="img1_me" onClick={() => clickA()}/>
          </Box>
        {/* </Link> */}
        {/* member imgageを配置する */}
        {images.map((image, index) => (
          <Box key={image.id} sx={{height:100, width:100, position:'absolute', left:image.x, top:image.y }} >
            <img src={image.imageurl} className="kzImage2" alt="imgX" onClick={() => clickC(index)}/>
          </Box>
        ))}

      </Box>

      <Box sx={{fontSize:'large', position: 'absolute', bottom:'12%' , right:'15%'}} >
          <SyncIcon  onClick={() => getMembers()}/>
          <SyncIcon  onClick={() => changeMe()}/>
      </Box>
      {/* <Link to='/registerpageHT'> */}
        <Box sx={{fontSize:'large', position: 'absolute', bottom:'12%' , right:'5%'}} >
          <AddCircleIcon onClick={()=>addMember()} />
        </Box>
      {/* </Link> */}
      <Footer pageid="1" names={names}/> 
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

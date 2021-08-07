import React from 'react'
import { Component } from 'react';
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect} from 'react';                           // effect (state変化したときの処理機能)
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useSpring, animated} from 'react-spring'           // アニメーション機能

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン

import heart from './img/heart.jpg'

// Heart コンポネント
export const Heart = () => {

  const [toggle, setToggle] = useState(0); // toggle: Heart文字の大小を決めるフラグ on(1)=小/off(0)=大
                                           // 　      state（コンポネント保持する変数）とする
                                           // setToggle: toggleをセットする関数名
                                           // useState(0): 初期値=0 

                                            // useEffet: 描画後に呼ばれる関数
                                            //  ⇒toggle(state)を変更する
                                            //  ⇒再描画される
                                            //  ⇒再びuseEffectが呼ばれる　を繰り返す
  useEffect( () => {
    const changeToggle = () => setToggle(toggle === 1 ? 0 : toggle + 1) //toggleをon(1)/off(0)する 
    const timeoutId = setTimeout(() => changeToggle(), 1000);    // 1000msec（1秒）ごとにchangeToggleを呼び出す
    return function cleanup() { clearTimeout(timeoutId);  };  // unmount時（画面遷移時）timeout関数をcleanupする
    } ,
    [toggle]                                                  // dependency: toggleの更新時だけ動作させる
  );
  
  // spring: アニメーション設定
  // const spring = useSpring(
  //   {color: toggle ? "#ffaaaa" : "red",　 //Heart文字色。toggleのon/offで文字色を切り替える（オレンジ⇔赤）　　　
  //     backgroundColor:"#ffffff44",        //背景色。白で固定。透明度は44（半透明）
  //     textAlign:"center",                 //文字位置。中央寄せ
  //     fontSize: toggle ? "48pt": "96pt",  //Heart文字サイズ。toggleのon/offで切り替える（48pt⇔96pt）
  //     opacity: 1.0,                       //不透明度。　1.0=不透明 0.0=透明　　　　
  //     transform: toggle ? 'translate(0%,200%)':'translate(0%,80%)', //表示位置。fontが大小する分修正する
  //     from: {color: "#ff0000"},           // transition機能用の設定。不要
  //     config: { mass: 1, tension: 100, friction: 50 } // tension:アニメーション変化スピード。
  //   })

  const spring2 = useSpring(
      {
        backgroundColor:"#444444",  
        color:"#ff0000",
        align:"left",
        textAlign:"center",
        fontSize: "96pt",
        width: toggle ? "200px" : "50px",
        height: toggle ? "200px" : "50px",

        config: { mass: 1, tension: 100, friction: 50 } // tension:アニメーション変化スピード。
      })
      // position:"fix",
      // top: "10",
      // left: "10",
 
  // Heartコンポネントのレイアウト  

  // animated.div + font 方式。springで transformationがきれいに設定できない
  // return (
  //   <div>
  //     <animated.div style={spring}>
  //       <FontAwesomeIcon icon={faHeart} />　
  //     </animated.div> 
  //   </div>
  // );

  // animated.div + font では (spring2) width,heightが効かない
  // return (
  //   <div className="div1 mt-5">
  //     <animated.div style={spring2}>
  //       <FontAwesomeIcon icon={faHeart} />　
  //     </animated.div> 
  //   </div>
  // );

  // animated.img には (spring2) width,heightが効く。ハートimageはとりあえず自作
  return (
    <div className="div1 mt-5">
      <animated.img src={heart} style={spring2}>
      </animated.img> 
    </div>
  );

}

class HeartPage extends Component {

  constructor(props){
    super(props);
    this.state = {
    };  
  }

  // path=/homepageに遷移する関数。遷移先のコンポネントはApp.jsのRouteで設定　
  selectHome = () => { this.props.history.push({ pathname: '/homepage' });  }

  // 画面レイアウト  
  render() {
    return (
      <div>
        <div className="kzHeader kzColor1 kzFont1">Kozipro</div>        {/* Header部 */}
        <Heart></Heart>
        <footer className="kzFooter kzColor2 kzFont1">
          <FontAwesomeIcon icon={faHome}  onClick={this.selectHome}/>
          <FontAwesomeIcon icon={faChartLine} />
          <FontAwesomeIcon icon={faHeart} />
        </footer>
      </div>
    );
  }
}
export default withRouter(HeartPage)  

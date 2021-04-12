import React from 'react'
import { Component } from 'react';
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect} from 'react';                           // effect (state変化したときの処理機能)
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useSpring, animated} from 'react-spring'           // アニメーション機能

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン

// Heart コンポネント
export const Heart = () => {

  const [toggle, setToggle] = useState(0); // toggleをon/offしてアニメーションを往復させる
  
  // useEffet: 描画後に呼ばれる関数
  // 1000msec（1秒）ごとにchangeToggleを呼び出す
  //  ⇒toggle(state)を変更する
  //  ⇒再描画される
  //  ⇒再びuseEffectが呼ばれる　を繰り返す
  useEffect( () => {
    const changeToggle = () => setToggle(toggle === 1 ? 0 : toggle + 1) //toggleをon(1)/off(0)する 
    const timeoutId = setTimeout(() => changeToggle(), 1000);  
    return function cleanup() { clearTimeout(timeoutId);  };  // unmount時（画面遷移時）timeout関数をcleanupする
    } ,
    [toggle]                                                  // dependency: toggleの更新時だけ動作させる
  );
  
  // spring: アニメーション設定
  const spring = useSpring(
    {color: toggle ? "#ffaaaa" : "red",　 //toggleのon/offで文字色を切り替える（オレンジ⇔赤）　　　
      backgroundColor:"#ffffff44",        //背景色は白で固定。透明度は44（半透明）
      textAlign:"center",                 //文字は中央寄せ
      fontSize: toggle ? "48pt": "96pt",  //toggleのon/offでフォントサイズを切り替える（48pt⇔96pt）
      opacity: 1.0,                       // 不透明度　1.0=不透明 0.0=透明　　　　
      transform: toggle ? 'translate(0%,200%)':'translate(0%,80%)', //表示位置。fontが大小する分修正する
      from: {color: "#ff0000"},           // transition機能用の設定。不要
      config: { mass: 1, tension: 100, friction: 50 } // tension:アニメーション変化スピード。
    })
 
  return (
    <div>
      <animated.div style={spring}>　       {/* アニメーション表示部 */}
        <FontAwesomeIcon icon={faHeart} />　{/* Heartアイコン        */}
      </animated.div> 
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

  render() {
    return (
      <div>
        <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
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

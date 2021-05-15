import React from 'react'
import { Component } from 'react';
// import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
// import { useEffect} from 'react';                           // effect (state変化したときの処理機能)
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
// import { useSpring, animated} from 'react-spring'           // アニメーション機能

import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン
import Loader from 'react-loader-spinner'

import Footer from './footer'        // コンポネント（部品）化したFooter

// TextAnalizerコンポネント
export const TextAnalizer = () => {

  return (
    <div>
      <div className="kzGraph">
        <p></p>
      </div>

      {/* テキスト解析のアニメーション。後でテキスト解析画面に置き換える */}
      <div className="mt-4">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000} // msec
        />
      </div>
    </div>
    
  );
}

class UserPage extends Component {

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
        <TextAnalizer></TextAnalizer>
        {/* <footer className="kzFooter kzColor2 kzFont1">
          <FontAwesomeIcon icon={faHome}  onClick={this.selectHome}/>
          <FontAwesomeIcon icon={faChartLine} />
          <FontAwesomeIcon icon={faHeart} />
        </footer> */}
        
        {/* footerを直接各代わりに、部品化したFooterを入れる */}
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(UserPage)  

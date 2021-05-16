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
import LineChart from './ActivitiesComponents/LineChart' // 心拍数表示機能
import ActivityHeader from './ActivitiesComponents/ActivityHeader' //　イベントのヘッダー部

// Graphコンポネント
export const Graph = () => {

  return (
    <div>
      <div className="kzGraph">
      </div>

      {/* bar graphのアニメーション。あとでグラフに置き換える */}
      <div className="mt-4">
        <Loader
          type="Audio"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={60000} // msec
        />
        <Loader
          type="Bars"
          color="#ff8800"
          height={100}
          width={100}
          timeout={60000} // msec
        />
        <Loader
          type="TailSpin"
          color="#44ff44"
          height={100}
          width={100}
          timeout={60000} // msec
        />
        <Loader
          type="Grid"
          color="#4444ff"
          height={100}
          width={100}
          timeout={60000} // msec
        />
        <Loader
          type="Hearts"
          color="#ff4444"
          height={100}
          width={100}
          timeout={60000} // msec
        />
      </div>
      
    </div>
    
  );
}

class GraphPage extends Component {

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
        <div>
          <LineChart />
        </div>
        <div className='kzActivityBox'>
          <ActivityHeader />
        </div>
        <Graph></Graph>
        <footer className="kzFooter kzColor2 kzFont1">
          <FontAwesomeIcon icon={faHome}  onClick={this.selectHome}/>
          <FontAwesomeIcon icon={faChartLine} />
          <FontAwesomeIcon icon={faHeart} />
        </footer>
      </div>
    );
  }
}
export default withRouter(GraphPage)  

import React from 'react'
//import { Component } from 'react';
// import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
// import { useEffect} from 'react';                           // effect (state変化したときの処理機能)
import { useHistory, withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
// import { useSpring, animated} from 'react-spring'           // アニメーション機能

import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン
//import Loader from 'react-loader-spinner'

import Header from "./components/header";
import Footer from "./components/footer";
import TextAnalysis from './TextAnalysisComponents/TextAnalysis' // コンテキスト分析機能

const TextPage = () => {
  // path=/homepageに遷移する関数。遷移先のコンポネントはApp.jsのRouteで設定　

  const history = useHistory();
  const selectHome = () => {
    history.push({ pathname: '/homepage' });
  }



  return (
    <div>
      <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
      <TextAnalysis></TextAnalysis>
      {/* <TextAnalizer></TextAnalizer> */}
      <footer className="kzFooter kzColor2 kzFont1">
        <FontAwesomeIcon icon={faHome} onClick={selectHome} />
        <FontAwesomeIcon icon={faChartLine} />
        <FontAwesomeIcon icon={faHeart} />
      </footer>
    </div>
  );
}

export default withRouter(TextPage)

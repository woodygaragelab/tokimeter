import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン

class HomePage extends Component {       // HomePage:メインページ
  constructor(props){                    // props: HomePageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: HomePageコンポネントが保持するデータ
  }

  // path=/heartpageに遷移する。遷移先のコンポネントはApp.jsのRouteで設定　
  selectHeart = () => {  this.props.history.push({ pathname: '/heartpage' });  }

  // 画面描画処理。 htmlを生成してreturnすると、Reactが描画する。
  render() {
    return (
      <div>
        {/* Header部 */}
        <div className="kzHeader kzColor1 kzFont1">Kozipro 4/11</div>

        {/* 顔表示部 あとで横スクロール（Karusell） にする*/}
        <div className="kzFace m-1"></div>

        {/* メニュー部　*/}
        <div className="kzMenu kzColor1 kzFont1 m-4" onclick={this.selectHeart}>
          <FontAwesomeIcon icon={faChartLine}/>イベントを記録
        </div>
        <div className="kzMenu kzColor1 kzFont1 m-4" onclick={this.selectHeart}>メッセージを記録</div>
        <div className="kzMenu kzColor1 kzFont1 m-4" onClick={this.selectHeart}>
          <FontAwesomeIcon icon={faHeart}/>Heartを表示
        </div>

        {/* Footer部 */}
        <footer className="kzFooter kzColor2 kzFont1">
          <FontAwesomeIcon icon={faHome} />                             {/* faHome:Homeアイコン */}
          <FontAwesomeIcon icon={faChartLine} />                        {/* faChartLine:グラフアイコン*/}
          <FontAwesomeIcon icon={faHeart} onClick={this.selectHeart}/>  {/* selectHeart関数で画面遷移する */}
        </footer>
      </div>
    );
  }
}
export default withRouter(HomePage) // 画面遷移対象にするので、withRoute()を使う
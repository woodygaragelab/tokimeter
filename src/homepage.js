import React from 'react'
import { Component } from 'react';
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import Carousel from 'react-bootstrap/Carousel';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン

import img1 from './img/jimin.jpg'   // homepageに表示する顔写真
import img2 from './img/jin.jpg'
import img3 from './img/songkang.jpg'
import img4 from './img/nam_dosan.jpg'
import img5 from './img/chorusan.jpg'


class HomePage extends Component {       // HomePage:メインページ
  constructor(props){                    // props: HomePageコンポネントが受け取るパラメータ
    super(props);
    this.state = { };                    // state: HomePageコンポネントが保持するデータ
  }

  // pathname:xxxに遷移する。遷移先のコンポネントはApp.jsのRouteで設定　
  selectGraph = () => {  this.props.history.push({ pathname: '/graphpage' });  }
  selectText  = () => {  this.props.history.push({ pathname: '/textpage' });  }
  selectHeart = () => {  this.props.history.push({ pathname: '/heartpage' });  }

  // 画面描画処理。 htmlを生成してreturnすると、Reactが描画する。
  render() {
    return (
      <div>
        {/* Header部 */}
        <div className="kzHeader kzColor1 kzFont1">Kozipro 4/24</div>

        {/* 顔表示部。 Carousel で横スクロール（自動）*/}
        <div className="kzFace">
          <Carousel>
            <Carousel.Item interval={1000}>
              <div className="col-sm-6 mx-auto">
                {/* イメージ領域(div)の基準幅をresponsiveにしておく。PC用は50%(col-6)にする */}
                {/* イメージ幅はさらに領域の50%とする。（ css kzImageのwidth=50%で指定）　*/}
                <img src={img1} className="kzImage" alt="img1"/>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <div className="col-sm-6 mx-auto">
                <img src={img2} className="kzImage" alt="img2"/>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <div className="col-sm-6 mx-auto">
                <img src={img3} className="kzImage" alt="img3"/>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <div className="col-sm-6 mx-auto">
                <img src={img4} className="kzImage" alt="img4"/>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <div className="col-sm-6 mx-auto">
                <img src={img5} className="kzImage" alt="img5"/>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        {/***** メニュー部　*****/}
        <div className="kzMenu kzColor1 kzFont1 m-4" onClick={this.selectGraph}>
          <FontAwesomeIcon icon={faChartLine}/>イベントを記録
        </div>
        <div className="kzMenu kzColor1 kzFont1 m-4" onClick={this.selectText}>
          メッセージを記録
        </div>
        <div className="kzMenu kzColor1 kzFont1 m-4" onClick={this.selectHeart}>
          <FontAwesomeIcon icon={faHeart}/>Heartを表示
        </div>


        {/***** Footer部 *****/}
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
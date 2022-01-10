import React from 'react'
//import { Component } from 'react';
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)

import { useHistory, withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
// import { useSpring, animated} from 'react-spring'           // アニメーション機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する

import Header from "./components/header";
import Footer from "./components/footer";


import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // アイコン表示機能
import { faHeart, faHome, faComments } from "@fortawesome/free-solid-svg-icons"; // Heart,Home,Graphのアイコン
import Loader from 'react-loader-spinner'
import LineChart from './ActivitiesComponents/LineChart' // 心拍数表示機能
import ActivityHeader from './ActivitiesComponents/ActivityHeader' //　イベントのヘッダー部
import AddActivity from './ActivitiesComponents/AddActivity' // イベント追加フォーム
import Activities from './ActivitiesComponents/Activities' //複数のイベント表示
//import { act } from 'react-dom/test-utils';

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

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
          timeout={60000} 
        />
        <Loader
          type="Bars"
          color="#ff8800"
          height={100}
          width={100}
          timeout={60000} 
        />
        <Loader
          type="TailSpin"
          color="#44ff44"
          height={100}
          width={100}
          timeout={60000} 
        />
        <Loader
          type="Grid"
          color="#4444ff"
          height={100}
          width={100}
          timeout={60000} 
        />
        <Loader
          type="Hearts"
          color="#ff4444"
          height={100}
          width={100}
          timeout={60000} 
        />
      </div>
    </div>
  );
}


const GraphPage = () => {

  const [showAddActivity, setShowAddActivity] = useState(false)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // const getActivities = async () => {
    //   const activityFromServer = await fetchActivities()
    //   setActivities(activityFromServer)
    // }

    // getActivities()
  }, [])

  //イベントをサーバーから取得
  const fetchActivities = async () => {
    const res = await fetch('http://localhost:5000/activities')
    const data = await res.json()

    return data

  }

  //　イベントの追加
  const addActivity = async (activity) => {
    const res_add = await fetch('http://localhost:5000/activities', {
      method: 'Post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(activity),
    })

    const data = await res_add.json()
    setActivities([...activities, data])

  }

  // イベントの削除 
  const deleteActivity = async (id) => {
    const isDelete = window.confirm("イベントを削除しましょうか？")
    if (isDelete) {
      await fetch(`http://localhost:5000/activities/${id}`, {
        method: 'DELETE',
      })

      //  削除されたid以外のイベントのみを表示する
      setActivities(activities.filter((activity) => activity.id !== id))
    }
    else {
      // 削除をキャンセルする時、何もしない
    }

  }

  // // ボタン「追加」<->「閉じる」状態を反転させる
  const toggleShowActivity = () => {
    setShowAddActivity(!showAddActivity)

  }

  // path=/homepageに遷移する関数。遷移先のコンポネントはApp.jsのRouteで設定　
  const history = useHistory();
  const selectHome = () => {
    history.push({ pathname: '/homepage' });
  }

  //path=/heartpageに遷移する関数。選択先のコンポネントはApp.jsのRouteで設定
  const selectHeart = () => {
    history.push({ pathname: '/heartpage' })
  }

  //path=/textpageに遷移する関数。選択先のコンポネントはApp.jsのRouteで設定
  const selectText = () => {
    history.push({ pathname: '/textpage' })
  }


  return (
    <ThemeProvider theme={theme}>
    <Header />

    <div>
      {/* <div className="kzHeader kzColor1 kzFont1">Kozipro</div> */}
      <div>
        <LineChart />
      </div>
      <div className='kzActivityBox'>
        <ActivityHeader showAdd={showAddActivity} onClick={() => toggleShowActivity()} />
        {/* イベント追加フォールの表示をボタンの状態を基に作動する */}
        {showAddActivity && <AddActivity onAdd={addActivity} />}
        <Activities activities={activities} onDelete={deleteActivity} />
      </div>
      {/* <Graph></Graph> */}
      <footer className="kzFooter kzColor2 kzFont1">
        <FontAwesomeIcon icon={faHome} onClick={selectHome} />
        <FontAwesomeIcon icon={faComments} onClick={selectText} />
        <FontAwesomeIcon icon={faHeart} onClick={selectHeart} />
      </footer>
    </div>
    </ThemeProvider>

  );
}

export default withRouter(GraphPage)

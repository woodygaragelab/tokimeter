import React from 'react'
import { useState } from 'react';                           // state（コンポネント単位のデータ保存機能）
import { useEffect } from 'react';                           // effect (state変化したときの処理機能)
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';

// import './App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import Header from "../components/header";
import Footer from "../components/footer";

import LineChart      from '../ActivitiesComponents/LineChart' // 心拍数表示機能
import ActivityHeader from '../ActivitiesComponents/ActivityHeader' //　イベントのヘッダー部
import AddActivity    from '../ActivitiesComponents/AddActivity' // イベント追加フォーム
import Activities     from '../ActivitiesComponents/Activities' //複数のイベント表示

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

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
  // const fetchActivities = async () => {
  //   const res = await fetch('http://localhost:5000/activities')
  //   const data = await res.json()
  //   return data
  // }

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

  return (
    <ThemeProvider theme={theme}>
    <Header/>

    <Box sx={{height:800}}>
      <Box sx={{height:100, background:'#ffffff',border:'1px solid black'}}/>
      <Box sx={{background: '#bb6677'}}>
        <LineChart />
      </Box>
      <Box sx={{ p:'30px', m:'30px', border:'1px solid black', borderRadius:'5px', maxWidth:'800px',minHeight:'300px' }}>
        <ActivityHeader showAdd={showAddActivity} onClick={() => toggleShowActivity()} />
        {/* イベント追加フォールの表示をボタンの状態を基に作動する */}
        {showAddActivity && <AddActivity onAdd={addActivity} />}
        <Activities activities={activities} onDelete={deleteActivity} />
      </Box>
    </Box>

    <Footer pageid="0"/> 
    </ThemeProvider>

  );
}

export default withRouter(GraphPage)
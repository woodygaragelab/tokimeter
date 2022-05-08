import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能
import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う

import '../App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import Header from "../components/header";
import Footer from "../components/footer";

import Select      from '@mui/material/Select'
import MenuItem    from '@mui/material/MenuItem'
import InputLabel  from '@mui/material/InputLabel';

import GetMembers  from '../components/getmembers';
import { getInputAdornmentUtilityClass, getNativeSelectUtilityClasses } from '@mui/material';


const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});

const TextPage = () => {

  const [member, setMember] = useState('') // 名前
  
  const [nameList, setNameList] = useState(['member1','member2','member3']) // 名前のリストと初期値
  const  getNames = async () => {        // server(DB)からmemberの名前リストを取得する
    setNameList(await GetMembers());     // 名前リスト取得関数(非同期)の戻り値をnamelistにセットする
  };  
  useEffect(() => {  getNames(); },[]);  // 画面初期設定時にmemberの名前リストを取得する

    return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Box sx={{height:800}}>
      <Box sx={{height:100}}/>

      <Box width="200px" margin="auto">
        <InputLabel id="member-simple-select-label">名前</InputLabel>
        <Select
            id="member-simple-select"
            label="名前"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            fullWidth
        >
          {nameList.map((name, index) => (   // 名前の選択値をnameListからmapして作成する
            <MenuItem key={index} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
    <Footer pageid="2"/> 
    </ThemeProvider>
    
  );
}

export default withRouter(TextPage)
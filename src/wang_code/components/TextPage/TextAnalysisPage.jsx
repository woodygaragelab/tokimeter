import React from 'react'
import { withRouter } from 'react-router-dom';              // router (画面遷移制御)機能

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import { Box } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う

import '../../../App.css';                  // アプリ共通StyleSheet。kzXxxxx のスタイルはすべてここで定義する
import Header from "../../../components/header";
import Footer from "../../../components/footer";

import TextAnalysisCore from './TextAnalysisCore' // コンテキスト分析機能

const theme = createTheme({ 
  palette: {
    primary:   { main: pink[50],  },
    secondary: { main: pink[300], },
  },
});


const TextAnalysisPage = () => {

  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Box sx={{height:800}}>
      <Box sx={{height:100}}/>
      <TextAnalysisCore></TextAnalysisCore>
    </Box>
    <Footer pageid="2"/> 
    </ThemeProvider>
  );
}

export default TextAnalysisPage
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）

import LoginPage from './loginpage';
import LoginPage2 from './loginpage2';
import HomePage from './homepage';
import HomePage2 from './homepage2';
import HeartPage from './heartpage';
import GraphPage from './graphpage';
import TextPage from './textpage';
import UserPage from './userpage';
import ResultList from './TextAnalysisComponents/ResultList';

  class App extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          
          <Router>   
          <Switch>
            <Route exact={true} path='/' component={LoginPage2}/>
            <Route exact={true} path='/loginpage' component={LoginPage}/>
            <Route exact={true} path='/loginpage2' component={LoginPage2}/>
            <Route exact={true} path='/homepage' component={HomePage}/>
            <Route exact={true} path='/homepage2' component={HomePage2}/>
            <Route exact={true} path='/heartpage' component={HeartPage}/>
            <Route exact={true} path='/graphpage' component={GraphPage}/>
            <Route exact={true} path='/textpage' component={TextPage}/>
            <Route exact={true} path='/userpage' component={UserPage}/>
            <Route exact={true} path='/TextAnalysisComponents/ResultList' component={ResultList}/>
          </Switch>
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default App;
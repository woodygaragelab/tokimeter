import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
//import { withAuthenticator } from '@aws-amplify/ui-react';
//import { AmplifySignOut } from '@aws-amplify/ui-react';
//import { Auth } from 'aws-amplify';

import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）

import LoginPage from './loginpage';
import HomePage from './homepage';
import HeartPage from './heartpage';
import GraphPage from './graphpage';
import TextPage from './textpage';
import UserPage from './userpage'

  // アプリ Main Module (Class)
  class App extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          
          <Router>    {/* Router: 画面遷移定義 */}
          <Switch>
            <Route exact={true} path='/' component={HomePage}/>
            <Route exact={true} path='/loginpage' component={LoginPage}/>
            <Route exact={true} path='/homepage' component={HomePage}/>
            <Route exact={true} path='/heartpage' component={HeartPage}/>
            <Route exact={true} path='/graphpage' component={GraphPage}/>
            <Route exact={true} path='/textpage' component={TextPage}/>
            <Route exact={true} path='/userpage' component={UserPage}/>
          </Switch>
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default App;

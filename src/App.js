import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）

import LoginPageX from './loginpageX';
import LoginPage  from './loginpage';
import HomePageX  from './homepageX';
import HomePage   from './homepage';
import HeartPage  from './heartpage';
import GraphPage  from './graphpage';
import TextPage   from './textpage';
import UserPage   from './userpage';
import ResultList from './TextAnalysisComponents/ResultList';

  class App extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          
          <Router>   
          <Switch>
            <Route exact={true} path='/' component={LoginPage}/>
            <Route exact={true} path='/loginpageX' component={LoginPageX}/>
            <Route exact={true} path='/loginpage'  component={LoginPage}/>
            <Route exact={true} path='/homepageX'  component={HomePageX}/>
            <Route exact={true} path='/homepage'   component={HomePage}/>
            <Route exact={true} path='/heartpage'  component={HeartPage}/>
            <Route exact={true} path='/graphpage'  component={GraphPage}/>
            <Route exact={true} path='/textpage'   component={TextPage}/>
            <Route exact={true} path='/userpage'   component={UserPage}/>
            <Route exact={true} path='/TextAnalysisComponents/ResultList' component={ResultList}/>
          </Switch>
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default App;
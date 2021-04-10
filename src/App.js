import React from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
//import { AmplifySignOut } from '@aws-amplify/ui-react';
//import { Auth } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './homepage';
import HeartPage from './heartpage';
//import GraphPage from './graphpage';
//import TextPage from './textpage';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

  class App extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          <Router>
          <Switch>
            <Route exact={true} path='/' component={HomePage}/>
            <Route exact={true} path='/homepage' component={HomePage}/>
            <Route exact={true} path='/heartpage' component={HeartPage}/>
            {/* <Route exact={true} path='/graphpage' component={GraphPage}/>
            <Route exact={true} path='/textpage' component={TextPage}/> */}
          </Switch>
          </Router>
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default App;

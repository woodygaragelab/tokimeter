import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 標準スタイルは bootstrapを使う
import './App.css';                            // アプリ共通スタイル（kzXxxxx）

// import LoginPageX from './loginpageX';
import LoginPage  from './loginpage';
import HomePageD  from './design_code/homepage';
import HomePage   from './homepage';
import HomePageHM   from './homepageHM';  // takamura 2/2
import HomePageHT   from './takamura_code/homepageHT';  // takamura 2/3
import UploadPageHT from './takamura_code/uploadpageHT';  // takamura 3/5
import HeartPage  from './heartpage';
import GraphPage  from './graphpage';
import GraphPageD  from './design_code/graphpage';
import TextPage   from './textpage';
import UserPage   from './userpage';
import ResultList from './TextAnalysisComponents/ResultList';
import SignUp from './signuppage';
import LoginPageW from './wang_code/components/loginpageW';
import signuppageW from './wang_code/components/signuppageW';
import newPasswordW from './wang_code/components/newPassword';
import newEmailW from './wang_code/components/newEmail';
import forgotPasswordW from './wang_code/components/forgotPassword'
import SettingsPage  from './settingspage';
import SettingsPageHT  from './takamura_code/settingspageHT';
//import RegisterPage  from './meguro_code/registerpage'; //meguro 3/22
import RegisterPage  from './registerpage'; //takamura 4/14
import EventActivity from './wang_code/components/EventPage/EventActivityPage'
import TextAnalysis from './wang_code/components/TextPage/TextAnalysisPage'

  class App extends React.Component {

    render(){
      return (
        <div className="App">
          <div>
          
          <Router>   
          <Switch>
            <Route exact={true} path='/' component={LoginPage}/>
            {/* <Route exact={true} path='/loginpageX' component={LoginPageX}/> */}
            <Route exact={true} path='/loginpage'  component={LoginPage}/>
            <Route exact={true} path='/signuppage' component={SignUp}/>
            <Route exact={true} path='/homepageD'  component={HomePageD}/>
            <Route exact={true} path='/homepage'   component={HomePage}/>
            <Route exact={true} path='/homepagehm'   component={HomePageHM}/>
            <Route exact={true} path='/homepageht'   component={HomePageHT}/>
            <Route exact={true} path='/uploadpageht' component={UploadPageHT}/>
            <Route exact={true} path='/heartpage'  component={HeartPage}/>
            <Route exact={true} path='/graphpage'  component={EventActivity}/>
            <Route exact={true} path='/graphpageD'  component={GraphPageD}/>
            <Route exact={true} path='/textpage'   component={TextPage}/>
            <Route exact={true} path='/userpage'   component={UserPage}/>
            <Route exact={true} path='/TextAnalysisComponents/ResultList' component={ResultList}/>
            <Route exact={true} path='/loginpageW' component={LoginPageW}/>
            <Route exact={true} path='/signuppageW' component={signuppageW}/>
            <Route exact={true} path='/newPasswordW' component={newPasswordW} />
            <Route exact={true} path='/newEmailW' component={newEmailW} />
            <Route exact={true} path='/forgotPasswordW' component={forgotPasswordW} />
            <Route exact={true} path='/settingspage' component={SettingsPage} />
            <Route exact={true} path='/settingspageHT' component={SettingsPageHT} />
            <Route exact={true} path='/registerpage' component={RegisterPage} />
            <Route exact={true} path='/EventActivity' component={EventActivity} />
            <Route exact={true} paht='/TextAnalysisW' component={TextAnalysis} />


    
          </Switch>
          </Router>
          
          </div>      
        {/* <AmplifySignOut /> */}
      </div>
  
    )};
  }  

export default App;
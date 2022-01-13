import React,{useState} from 'react'
import {Auth} from 'aws-amplify'
import { Button,TextField,Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {CognitoUser,AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from '../UserPool';
import { ConsoleLogger } from '@aws-amplify/core';
import { withStyles } from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";




function SignIn({onSignIn}) {

    const [username,setUsername] = useState(''); // emailが一時的にusernameとして扱う
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('')
    const history = useHistory()

  

    const onSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username:email,
            Pool:UserPool ,   
        });  

        const authDetails = new AuthenticationDetails({
            Username:email,
            Password:password,
        });

        user.authenticateUser(authDetails,{
            onSuccess:(data) => {
                console.log("onSuccess: ",data);
                selectHome();
            },
            onFailure:(err) => {
                console.error("onFailure :",err);
                alert(err.message || JSON.stringify(err))
            },
            newPasswordRequired:(data) => {
                console.log("newPasswordRequired: ",data);
            }
        });

    };


    const selectHome = () => {  history.push({ pathname: '/homepage' });  }

    return (
        <div>
            <Box>
            {/* <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth /> */}
            <TextField label="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            Don't have an account? <Link to='/signuppage'>Sign up</Link>
            <Box>
                Forget your password? <Link to='/'>Click here</Link>
           
            </Box>
           
            </Box>
            <Box>
            <Button
              id='signInButton'   
              onClick={selectHome}
              variant="contained" color="secondary" style={{ width: '100%' }}>
              Login
            </Button>
            </Box>
        </div>
    )
}

export default SignIn

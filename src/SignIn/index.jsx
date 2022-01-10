import React,{useState} from 'react'
import {Auth} from 'aws-amplify'
import { Button,TextField,Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';




function SignIn({onSignIn}) {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory()

    // const signIn = async () => {
    //     try {
    //         const user = await Auth.signIn(username,password);
    //         history.push('/homepage');
    //         onSignIn()
    //     }catch (error){
    //         console.log('there was an error logging in',error)
    //     }
    // }

    const selectHome = () => {  history.push({ pathname: '/homepage' });  }

    return (
        <div>
            <Box>
            <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
            <TextField label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            Don't have an account? <Link to='/signuppage'>Sign up</Link>
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

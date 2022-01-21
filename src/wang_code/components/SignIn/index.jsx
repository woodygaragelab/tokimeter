import React,{useState,useContext} from 'react'
import { AccountContext } from '../Account';
import { Button,TextField,Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignIn({onSignIn}) {

    const [username,setUsername] = useState(''); // emailが一時的にusernameとして扱う
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('')
    const history = useHistory()

    const {authenticate} = useContext(AccountContext)


    const onSubmit = (e) => {
        e.preventDefault();

        authenticate(email, password)
        .then((data) => {
          console.log("Logged in!", data);
          history.push({pathname:'/homepage'})
        })
        .catch((err) => {
          console.error("Failed to sign in", err);
          alert(err.message || JSON.stringify(err))
        });

    };

    return (
        <div>
            <Box>
              作業中
            {/* <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth /> */}
            <TextField label="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
            Don't have an account? <Link to='/signuppageW'>Sign up</Link>
            <Box>
                Forget your password? <Link to='/'>Click here</Link>
           
            </Box>
           
            </Box>
            <Box>
            <Button
              id='signInButton'   
              onClick={onSubmit}
              variant="contained" color="secondary" style={{ width: '100%' }}>
              ログイン
            </Button>
            </Box>
        </div>
    )
}

export default SignIn

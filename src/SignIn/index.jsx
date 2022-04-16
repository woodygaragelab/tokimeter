import React, { useState, useContext } from 'react'
import { AccountContext } from '../components/Account';
import { Button, TextField, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Kozipro Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function SignIn({ onSignIn }) {

  const [username, setUsername] = useState(''); // emailが一時的にusernameとして扱う
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const history = useHistory()

  const { authenticate } = useContext(AccountContext)


  const onSubmit = (e) => {
    e.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
      })
      .catch((err) => {
        console.error("Failed to sign in", err);
        alert(err.message || JSON.stringify(err))
      });
  };


  const selectHome = () => { history.push({ pathname: '/homepage' }); }

  return (
    <div>
      <Box>
        {/* <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth /> */}
        <TextField margin="normal" label="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth autoFocus />
        <TextField margin="normal" label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />

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
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default SignIn

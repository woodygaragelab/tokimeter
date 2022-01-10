import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button, TextField, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const signUp = async () => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          // optional
                    phonenumber,   // optional - E.164 number convention
                    // other custom attributes 
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }


    return (
        <div>
            <Box>
                <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
                <TextField label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <TextField label="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField label="Phone" id="phonenumber" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} fullWidth />
                Already have an account? <Link to='/loginpage'>Sign in</Link>
            </Box>
            <Box>
                <Link to="/loginpage">
                    <Button
                        id='signUpButton'
                        //   onClick={signUp}
                        variant="contained" color="secondary" style={{ width: '100%' }}>
                        Sign Up
                    </Button>
                </Link>
            </Box>
        </div>
    )
}

export default SignUp

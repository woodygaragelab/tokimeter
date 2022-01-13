import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button, TextField, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import UserPool from '../UserPool';

function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        UserPool.signUp(email,password,[],null,(err,data) =>{
            if(err){
                alert(err)
            }
            console.log(data);
                    })
    }



    return (
        <div>

            <Box>
                {/* <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth /> */}
                <TextField label="Email" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField label="Password" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />

                {/* <TextField label="Phone" id="phonenumber" value={phonenumber} onChange={e => setPhonenumber(e.target.value)} fullWidth /> */}
                Already have an account? <Link to='/loginpage'>Sign in</Link>

            </Box>
            <Box>

                <Button
                    id='signUpButton'
                    onClick={onSubmit}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                    Sign Up
                </Button>
            </Box>

        </div>
    )
}

export default SignUp

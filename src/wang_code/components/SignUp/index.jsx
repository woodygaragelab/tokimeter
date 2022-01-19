import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button, TextField, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserPool from '../../../UserPool';


function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const history = useHistory()


    const onSubmit = (e) => {
        e.preventDefault();

        UserPool.signUp(email,password,[],null,(err,data) =>{
            if(err){
                alert(err.message || JSON.stringify(err))
            }
            console.log(data);
            history.push({pathname:'./loginpageW'})
                    })
    }


    return (
        <div>
            Koziproメンテナンス中
            <Box>
                
                <TextField 
                    required 
                    label="Eメール" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    fullWidth />
                <TextField 
                    required 
                    label="パスワード" 
                    id="password" 
                    type='password'
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 

                    fullWidth />
                <TextField 
                    disabled 
                    label="ID (Unablse)" 
                    id="userid" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    fullWidth />
                <TextField 
                    disabled 
                    label="Phone (Unable)" 
                    id="phonenumber" 
                    value={phonenumber} 　
                    onChange={e => setPhonenumber(e.target.value)} 
                    fullWidth />
                Already have an account? <Link to='/loginpageW'>Sign in</Link>

            </Box>
            <Box>

                <Button
                    id='signUpButton'
                    onClick={onSubmit}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                    新規登録
                </Button>
            </Box>

        </div>
    )
}

export default SignUp

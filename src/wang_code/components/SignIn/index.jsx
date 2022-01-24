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
             
            {/* <TextField label="ID" id="userid" value={username} onChange={e => setUsername(e.target.value)} fullWidth /> */}
            <TextField label="メールアドレス" id="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <TextField label="パスワード" id="password" type='password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
             <Link to='/forgotPasswordW'>パスワードを忘れた場合</Link>
            </Box>


            <Box m={2}>
          
            <Button
              id='signInButton'   
              onClick={onSubmit}
              variant="contained" color="secondary" style={{ width: '100%' }}>
              ログイン
            </Button>
            
            <Box marginTop={2}>
            アカウントをお持ちでないですか？
            <Button
              id='signInButton'   
              
              onClick={() =>{history.push({pathname:'/signuppageW'})}}
              variant="contained" color="primary" style={{ width: '100%' }}>
              登録する
            </Button>
            </Box>
           
            </Box>
        </div>
    )
}

export default SignIn

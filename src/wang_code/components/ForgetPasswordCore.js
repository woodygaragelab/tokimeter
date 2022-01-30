import React, { useState } from 'react';
import UserPool from '../../UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button, TextField, Box } from '@material-ui/core'


const ForgetPasswordCore = () => {

    console.log("forgetPasswordCore is running...")
    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage.
    const [useremail, setUserEmail] = useState("");
    const [code,setCode] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const getUser = () => {
        return new CognitoUser({
            Username: useremail.toLowerCase(),
            Pool:UserPool,
        });
    };

    const sendCode = e => {
        e.preventDefault();

        getUser().forgotPassword({
            onSuccess: data => {
                console.log("111")
                console.log("onSuccess:", data);
            },
            onFailure: err => {
                console.log("222")
                console.error("onFailure:", err);
            },
            inputVerificationCode: data => {
                console.log("333")
                console.log("Input code:", data);
                setStage(2);
            }
        });
    };


    const resetPassword = e => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          console.error("Passwords are not the same");
          return;
        }
    
        getUser().confirmPassword(code, password, {
          onSuccess: data => {
            console.log("onSuccess:", data);
          },
          onFailure: err => {
            console.error("onFailure:", err);
          }
        });
      };

    return <div>
        {stage === 1 && (
            <Box>
                <TextField label="メールアドレス" id="email" value={useremail} onChange={e => setUserEmail(e.target.value)} fullWidth />

                <Button
                    id='signInButton'
                    onClick={sendCode}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                   Send verification code
                </Button>
            </Box>
        )}


        {stage === 2 && (
            <Box>
                <TextField label="認証コード" id="code" value={code} onChange={e => setCode(e.target.value)} fullWidth />
                <TextField label="新パスワード" id="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <TextField label="新パスワード（確認）" id="confrimPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} fullWidth />
                <Button
                    id='signInButton'
                    onClick={resetPassword}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                   Change Password
                </Button>
            </Box>
        )
        }

    </div>
}
export default ForgetPasswordCore;

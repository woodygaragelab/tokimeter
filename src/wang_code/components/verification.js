import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import UserPool from '../../UserPool'
import { Button, TextField, Box } from '@material-ui/core'



 const Verification = ()=> {

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("")



    const verifyCode = () => {
        const cognitoUser = new CognitoUser({
            Username: email.toLowerCase(),
            Pool: UserPool
        })

        cognitoUser.confirmRegistration(verificationCode, true, (err, data) => {
            if (err) {
                alert(err.message || JSON.stringify(err))
                return;
            }
            console.log("compolete SignUp!")
            setEmail("")
            setVerificationCode("")
        })

    }




    return (
        <div>
            <Box>
                <TextField
                    required
                    label="認証コード"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                    fullWidth />


                <TextField
                    required
                    label="メールアドレス"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth />
            </Box>

            <Box marginTop={3}>

            <Button
                    id='signUpWithVerificationCode'
                    onClick={verifyCode}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                    登録
                </Button>
            </Box>

        </div>);
}

export default Verification;



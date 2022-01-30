import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import UserPool from '../../UserPool'
import { Button, TextField, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom';



 const Verification = ({userEmail})=> {

    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("")

    const history = useHistory()


    const verifyCode = () => {
        console.log("Email:",userEmail)
        const cognitoUser = new CognitoUser({
            Username: userEmail.toLowerCase(),
            Pool: UserPool
        })

        cognitoUser.confirmRegistration(verificationCode.trim(), true, (err, data) => {
            if (err) {
                alert(err.message || JSON.stringify(err))
                return;
            }
            console.log("complete SignUp!")
            setEmail("")
            setVerificationCode("")
            history.push('/loginpageW')

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

{/* 
                <TextField
                    required
                    label="メールアドレス"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth /> */}
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



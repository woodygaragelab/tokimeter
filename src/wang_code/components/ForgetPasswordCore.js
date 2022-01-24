import React, { useState } from 'react';
import UserPool from '../../UserPool';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button,TextField,Box } from '@material-ui/core'


const  ForgetPasswordCore =() =>{

    console.log("forgetPasswordCore is running...")
    const [stage, setStage] = useState(2); // 1 = email stage, 2 = code stage.
    const [useremail, setUserEmail] = useState('test@test');

    const getUser = () => {
        console.log("useremail:",useremail);
        return new CognitoUser({
            Username: useremail.toLowerCase,
            UserPool
        });
    };

    const sendCode =(e) => {
        console.log("sendCode is running...")
        e.preventDefault();



        getUser().forgotPassword({
            onSuccess: data => {
                console.log("11111")
                console.log("onSuccess:", data);
            },
            onFailure: err => {
                console.log("22222")
                console.error("onFailure:", err);
            },
            inputVerificationCode: data => {
                console.log("33333")
                console.log("Input code:", data);
                setStage(2);
            }
        });
    };

    const resetPassword = (e) => {
        e.preventDefault();
    }





    return <div>
        {stage === 1 && (
            <Box>
                <TextField label="メールアドレス" id="email" value={useremail} onChange={e => setUserEmail(e.target.value)} fullWidth />
                <Button
              id='signInButton'   
              onClick={sendCode}
              variant="contained" color="secondary" style={{ width: '100%' }}>
              Change Password
            </Button>
              
            </Box>
         
                
       
        )}


        {stage === 2 && (
            <div>Coming soon...</div>
        )
        }

    </div>
}
    export default ForgetPasswordCore;

import React, { useState, useContext } from "react"
import { Button, TextField, Box } from '@material-ui/core'
import { AccountContext } from "./Account";
import { Link } from 'react-router-dom';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useHistory } from "react-router-dom";

export default () => {

    const [newEmail, setNewEmail] = useState("")
    const [password, setPassword] = useState(""); // use current password to vefify to change the email.

    const { getSession, authenticate } = useContext(AccountContext);

    const history = useHistory();


    const onSubmit = (e) => {
        e.preventDefault();
        console.log("changeEmail page running...")
        getSession().then(({ user, email }) => {
            authenticate(email, password).then(() => {
                const attributes = [
                    new CognitoUserAttribute({ Name: "email", Value: newEmail })
                ];

                user.updateAttributes(attributes, (err, results) => {
                    if (err) {
                        console.error(err);
                        alert(err.message || JSON.stringify(err))
                        return;
                    } else {
                        console.log(results);
                        history.push('./verificationW')
                    }
                })
            })
        })

    };


    return (
        <div>
            <Box>
                <TextField
                    label="New Email"
                    id="new email"
                    type='text'
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    fullWidth />

                <TextField
                    required
                    label="Current Password"
                    id="current password"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth />


                <Box>


                </Box>

            </Box>
            <Box>
                Back to  <Link to='/loginpageW'>Login</Link> page
            </Box>
            <Box marginTop={3}>
                <Button
                    id='changeEmailButton'
                    onClick={onSubmit}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                    Change Email
                </Button>
            </Box>

        </div>
    )
}


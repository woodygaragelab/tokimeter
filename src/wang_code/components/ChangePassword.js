import React, { useState, useContext } from "react"
import { Button,TextField,Box } from '@material-ui/core'
import { AccountContext } from "./Account";
import { Link } from 'react-router-dom';

export default () => {

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const { getSession } = useContext(AccountContext);


    const onSubmit = (e) => {
        e.preventDefault();

        getSession().then(({ user }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    alert(err.message || JSON.stringify(err))
                } else {
                    console.log(result);
                }
            });
        })

    };


    return (
        <div>
            <Box>
                <TextField 
                    required
                    label="Current Password" 
                    id="current password" 
                    type='password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    fullWidth />
                <TextField 
                    label="New Password" 
                    id="new password" 
                    type='password' 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}
                     fullWidth />

                <Box>


                </Box>

            </Box>
            <Box>
               Back to  <Link to='/loginpageW'>Login</Link> page
            </Box>
            <Box marginTop={3}>
                <Button
                    id='changePasswordButton'
                    onClick={onSubmit}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                    Change Password
                </Button>
            </Box>

        </div>
    )
}


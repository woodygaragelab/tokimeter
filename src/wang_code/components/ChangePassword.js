import React, { useState, useContext } from "react"
import { Button, TextField, Box } from '@material-ui/core'
import { AccountContext } from "./Account";

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
                } else {
                    console.log(result);
                }
            });
        })

    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <Box>
                    <TextField
                        required
                        label="Current Password"
                        id="current password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth />
                    <TextField
                        required
                        label="New Password"
                        id="new password"
                        type='password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        fullWidth />
                </Box>
                R U Sure ?
                <Box>
                    <Button
                        id='signUpButton'
                        onClick={onSubmit}
                        variant="contained" color="secondary" style={{ width: '100%' }}>
                        Change Password
                    </Button>
                </Box>
            </form>
        </div>
    )
}
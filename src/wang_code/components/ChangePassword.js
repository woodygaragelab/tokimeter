import React, { useState, useContext } from "react"
import { Button, TextField, Box } from '@material-ui/core'
import { AccountContext } from "./Account";
import { Link } from 'react-router-dom';

export default () => {

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    

    const { getSession,logout } = useContext(AccountContext);


    const onSubmit = (e) => {
        e.preventDefault();

        getSession().then(({ user }) => {

            if (newPassword !== confirmNewPassword) {


                alert("パスワードが一致しません")
                return;
            }

            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    alert(err.message || JSON.stringify(err))
                } else {
                    console.log(result);
                    alert("パスワード変更成功")
                    logout();
                    
                }
            });
        })

    };


    return (
        <div>
            <Box>
                <TextField
                    required
                    label="現在のパスワード"
                    id="currentPassword"
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth />
                <TextField
                    label="新パスワード"
                    id="NewPassword"
                    type='password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    fullWidth />

                <TextField
                    label="新パスワード(確認）"
                    id="confrimNewPassword"
                    type='password'
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    fullWidth />


                <Box>


                </Box>

            </Box>
            <Box>
                <Link to='/loginpageW'>ログイン</Link> 画面に移動
            </Box>
            <Box marginTop={3}>
                <Button
                    id='changePasswordButton'
                    onClick={onSubmit}
                    variant="contained" color="secondary" style={{ width: '100%' }}>
                   　パスワード変更
                </Button>
            </Box>
          
         
        </div>
    )
}


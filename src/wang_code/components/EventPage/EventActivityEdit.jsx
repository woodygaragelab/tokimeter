import React ,{ useEffect, useState }from 'react'
import { Paper, IconButton, CardContent } from '@material-ui/core';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import CardActions from '@mui/material/CardActions'

function EventActivityEdit({ activity,handleBackClick,editActivity }) {

    console.log("activity", activity.id)

    // 編集後のイベントデータ
    const [EditactivityData, setEditActivityData] = useState([])
    
    return (
        <CardContent>
            EDIT TEST
            <Box>
                <TextField
                    label="Event"
                    defaultValue={activity.event}
                    onChange={e => setEditActivityData({ ...activity, event: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Time"
                    type="time"
                    defaultValue={activity.time}
                    onChange={e => setEditActivityData({ ...activity, time: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Member1"
                    defaultValue={activity.member1}
                    onChange={e => setEditActivityData({ ...activity, member1: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
               
                    <TextField
                        label="Member2"
                        defaultValue={activity.member2}
                        onChange={e => setEditActivityData({ ...activity, member2: e.target.value })}
                        variant="standard"

                    /></Box>
            <Box>
              
                    <TextField
                        label="Member3"
                        defaultValue={activity.member3}
                        onChange={e => setEditActivityData({ ...activity, member3: e.target.value })}
                        variant="standard"

                    />
            </Box>
            <Box>
              
                    <TextField
                        label="Member4"
                        defaultValue={activity.member4}
                        onChange={e => setEditActivityData({ ...activity, member4: e.target.value })}
                        variant="standard"

                    />
            </Box>
            <Button onClick={() => editActivity(EditactivityData)}>
                保存
            </Button>

            <CardActions>
                  <IconButton aria-label="delete" size='small'　onClick={() => handleBackClick(activity)}>

                    <SettingsBackupRestoreIcon />
                    戻す
                  </IconButton>
                  
                </CardActions>


        </CardContent>

    )
}

export default EventActivityEdit



import React ,{ useEffect, useState }from 'react'
import { Paper, IconButton, CardContent } from '@material-ui/core';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

function EventActivityEdit({ activity }) {

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
                    onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Time"
                    type="time"
                    defaultValue={activity.time}
                    onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Member1"
                    defaultValue={activity.member1}
                    onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                    variant="standard"

                /></Box>
            <Box>
               
                    <TextField
                        label="Member2"
                        defaultValue={activity.member2}
                        onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                        variant="standard"

                    /></Box>
            <Box>
              
                    <TextField
                        label="Member3"
                        defaultValue={activity.member3}
                        onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                        variant="standard"

                    />
            </Box>
            <Box>
              
                    <TextField
                        label="Member4"
                        defaultValue={activity.member4}
                        onChange={e => setEditActivityData({ ...EditactivityData, event: e.target.value })}
                        variant="standard"

                    />
            </Box>
            <Button >
                保存
            </Button>


        </CardContent>

    )
}

export default EventActivityEdit



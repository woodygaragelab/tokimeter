import React from 'react'
import { Paper, IconButton, CardContent } from '@material-ui/core';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function EventActivityEdit({ activity }) {

    console.log("activity", activity)

    return (
        <CardContent>
            EDIT TEST
            <Box>
                <TextField
                    label="Event"
                    defaultValue={activity.event}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Time"
                    type="time"
                    defaultValue={activity.time}
                    variant="standard"

                /></Box>
            <Box>
                <TextField
                    label="Member1"
                    defaultValue={activity.member1}
                    variant="standard"

                /></Box>
            <Box>
                {activity.member2 ? (
                    <TextField
                        label="Member2"
                        defaultValue={activity.member2}
                        variant="standard"

                    />) : <div></div>}</Box>
            <Box>
                {activity.member3 ? (
                    <TextField
                        label="Member3"
                        defaultValue={activity.member3}
                        variant="standard"

                    />) : <div></div>}
            </Box>
            <Box>
                {activity.member4 ? (
                    <TextField
                        label="Member4"
                        defaultValue={activity.member4}
                        variant="standard"

                    />) : <div></div>}
            </Box>



        </CardContent>

    )
}

export default EventActivityEdit



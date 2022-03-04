import React, { useEffect, useState } from 'react';
import awsExports from "../../../aws-exports"
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { Container, Button, Form } from 'react-bootstrap';
import { listActivitys } from '../../../graphql/queries'
import { Paper, IconButton } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import TextField from '@mui/material/TextField'
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { createActivity, updateActivity } from '../../../graphql/mutations';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import pink from '@material-ui/core/colors/pink';



Amplify.configure(awsExports);

function EventActivityCore() {

  const [activities, setActivities] = useState([])
  const [showAddActivity, setShowAddActivity] = useState(false)


  useEffect(() => {
    fetchActivity()
  }, []);

  const fetchActivity = async () => {
    try {
      const activityData = await API.graphql(graphqlOperation(listActivitys))
      const activityList = activityData.data.listActivitys.items;

      setActivities(activityList)
    } catch (error) {
      console.log('error on fetching activities', error)
    }
  }

  const AddActivity = ({ onUpload }) => {

    const [activityData, setActivityData] = useState({});


    const uploadActivity = async () => {
      console.log('activityData', activityData);

      // 入力データ事前確認
      if (!activityData.event) {
        alert("イベント名を入力ください")
        return
      }

      if (!activityData.time) {
        alert("時間を入力ください")
        return
      }

      if (!activityData.member1) {
        alert("イベント１が必須項目で、入力ください")
      }
      // メンバー２～３が必須ではなくて、空白の場合まま登録する
      if (!activityData.member2) {
        activityData['member2'] = ''
      }

      if (!activityData.member3) {
        activityData['member3'] = ''
      }

      if (!activityData.member4) {
        activityData['member4'] = ''
      }


      console.log('new activityData', activityData)



      const { event, time, member1, member2, member3, member4 } = activityData;


      const createActivityInput = {
        id: uuid(),
        event,
        time,
        member1,
        member2,
        member3,
        member4
      }
      await API.graphql(graphqlOperation(createActivity, { input: createActivityInput }))
      onUpload(); // set seen/unseen button & fetch data from cloud.

    }

    return (
      <div className="newActivity">
       
        <Paper>

    
        <Box>
        <TextField
          label="Event"
          value={activityData.event}
          onChange={e => setActivityData({ ...activityData, event: e.target.value })}
          variant="standard"
        />
        </Box>
       
        <Box>
        <TextField
          label="Time"
          type="time"
          value={activityData.time}
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setActivityData({ ...activityData, time: e.target.value })} />

        </Box>
          <Box>
          <TextField
          label="Member1"
          value={activityData.member1}
          variant="standard"
          onChange={e => setActivityData({ ...activityData, member1: e.target.value })} />
          </Box>
          <Box>
        <TextField
          label="Member2"
          value={activityData.member2}
          variant="standard"
          onChange={e => setActivityData({ ...activityData, member2: e.target.value })} />

          </Box>
      
        <Box>
        <TextField
          label="Member3"
          value={activityData.member3}
          variant="standard"
          onChange={e => setActivityData({ ...activityData, member3: e.target.value })} />

        </Box>
      
        <Box>
        
        <TextField
          label="Member4"
          value={activityData.member4}
          variant="standard"
          onChange={e => setActivityData({ ...activityData, member4: e.target.value })}
        />
        </Box>
        <Box marginTop={3}>
        <Button onClick={uploadActivity}>Save</Button>
        </Box>
        <ExpandLessIcon onClick={() => setShowAddActivity(false)} />
        </Paper>

     
    
      </div>
    )
  }




  return (
    <Container>
      <div>
        <h3>Get in touch with Kozipro</h3>
        <br />

        GraphQL API Test Part
        <div>
          {activities.map((activity, idx) => {
            return <Paper variant='outlined' elevation={2} key={`activity${idx}`}>
              <Card>

                <div>Event: {activity.event}</div>
                <div>Time: {activity.time}</div>
                <div>Member1: {activity.member1}</div>

                {activity.member2 ? (<div>Member2: {activity.member2}</div>) : <div></div>}
                {activity.member3 ? (<div>Member3: {activity.member3}</div>) : <div></div>}
                {activity.member4 ? (<div>Member4: {activity.member4}</div>) : <div></div>}

              </Card>
            </Paper>
          })}
          {
            showAddActivity ? (
              <AddActivity onUpload={() => {
                setShowAddActivity(false)
                fetchActivity()
              }} />
            ) : <IconButton onClick={() => setShowAddActivity(true)}><ExpandMoreIcon /></IconButton>
          }
        </div>


      </div>
    </Container>
  );
}

export default EventActivityCore;

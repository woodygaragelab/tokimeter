import React, { useEffect, useState } from 'react';
import awsExports from "../../../aws-exports"
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { Container, Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { listKzActivitys } from '../../../graphql/queries'
import { Paper, IconButton, CardContent } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import TextField from '@mui/material/TextField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { createKzActivity, deleteKzActivity } from '../../../graphql/mutations';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventActivityEdit from './EventActivityEdit'

Amplify.configure(awsExports);

function EventActivityCore() {

  const [activities, setActivities] = useState([])
  const [showAddActivity, setShowAddActivity] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  console.log("Editing state",isEditing)


  useEffect(() => {
    fetchActivity()
  }, []);

  const fetchActivity = async () => {
    try {
      const activityData = await API.graphql(graphqlOperation(listKzActivitys))
      const activityList = activityData.data.listKzActivitys.items;

      setActivities(activityList)
    } catch (error) {
      console.log('error on fetching activities', error)
    }
  }

  // イベントの追加

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


      const createKzActivityInput = {
        id: uuid(),
        event,
        time,
        member1,
        member2,
        member3,
        member4
      }

      console.log("activity input", createKzActivityInput)

      await API.graphql(graphqlOperation(createKzActivity, { input: createKzActivityInput }))
      onUpload(); // set seen/unseen button & fetch data from cloud. onUpload works as an parameter.

    }



    return (
      <div className="newActivity">

        <Paper>


          <Box >
            <TextField
              label="Event"
              value={activityData.event}
              onChange={e => setActivityData({ ...activityData, event: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventAvailableIcon />
                  </InputAdornment>
                ),
              }}
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
              onChange={e => setActivityData({ ...activityData, time: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }} />

          </Box>
          <Box>
            <TextField
              label="Member1"
              value={activityData.member1}
              variant="standard"
              onChange={e => setActivityData({ ...activityData, member1: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              label="Member2"
              value={activityData.member2}
              variant="standard"
              onChange={e => setActivityData({ ...activityData, member2: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }} />

          </Box>

          <Box>
            <TextField
              label="Member3"
              value={activityData.member3}
              variant="standard"
              onChange={e => setActivityData({ ...activityData, member3: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }} />

          </Box>

          <Box>

            <TextField
              label="Member4"
              value={activityData.member4}
              variant="standard"
              onChange={e => setActivityData({ ...activityData, member4: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box marginTop={3}>
            <Button color="secondary" startIcon={<SaveIcon />} onClick={uploadActivity} >保存</Button>


          </Box>

          <ExpandLessIcon onClick={() => setShowAddActivity(false)} />
        </Paper>



      </div>
    )
  }

  //イベントの削除
  const removeActivity = async (id) => {
    const activityId = id // GraphQLのdelete関数に引数として渡すとき、id変数名と区別するため
    const isDelete = window.confirm("イベントを削除しましょうか？")
    if (isDelete) {
      console.log(id)

      const activityDetails = {
        id: activityId,
      };

      await API.graphql(graphqlOperation(deleteKzActivity, { input: activityDetails }))
      // イベントリストのリフレッシュと表示
      setShowAddActivity(false)
      fetchActivity()
    }

  }



  return (
    <Container>
      <div>
        <h3> 脈ありイベント</h3>
        <br />
        <div>
          {activities.map((activity, idx) => {
            return <Paper variant='outlined' elevation={2} key={`activity${idx}`}>
              <Card>
                {isEditing?(
                <CardContent>


                  <div>Event: {activity.event}</div>
                  <div>Time: {activity.time}</div>
                  <div>Member1: {activity.member1}</div>


                  {activity.member2 ? (<div>Member2: {activity.member2}</div>) : <div></div>}
                  {activity.member3 ? (<div>Member3: {activity.member3}</div>) : <div></div>}
                  {activity.member4 ? (<div>Member4: {activity.member4}</div>) : <div></div>}

                </CardContent>
                ):<EventActivityEdit key={idx} activity={activity}/>
             
                }
                <CardActions>
                  <IconButton aria-label="delete" size='small' onClick={() => removeActivity(activity.id)}　>

                    <DeleteIcon />
                    削除
                  </IconButton>
                  <IconButton aria-label="delete" size='small' onClick={() => setIsEditing(!isEditing)} disabled>
                      
                    <EditIcon />
                    編集（Coming soon)
                  </IconButton>
                </CardActions>

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

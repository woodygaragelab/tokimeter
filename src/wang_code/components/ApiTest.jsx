import React, { useEffect, useState } from 'react';
import awsExports from "../../aws-exports"
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { Container, Button, Form } from 'react-bootstrap';
import { listActivitys } from '../../graphql/queries'
import { Paper, IconButton } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import AddIcon from '@material-ui/icons/Add'
import TextField from '@mui/material/TextField'
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { createActivity, updateActivity } from '../../graphql/mutations';


Amplify.configure(awsExports);

function ApiTest() {

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

  // update posted content on Cloud.
  // Comment out for further use.
  // const updateActivity = async idx => {
  //   try {
  //     const activity = activities[idx];
  //     activitity.like = activity.like + 1;
  //     delete activity.createdAt;
  //     delete activity.updatedAt;

  //     const activityData = await API.graphql(graphqlOperation(updateActivity,{input: activity}));
  //     const activitityList = [...activities];
  //     activitityList[idx] = activityData.data.updateActivity;
  //     setActivities(activitityList);
  //   } catch (error) {
  //     Console.log('error on updating activity data',error);
  //   }
  // }

  const AddActivity = ({ onUpload }) => {

    const [activityData, setActivityData] = useState({ });


    const uploadActivity = async () => {
      console.log('activityData',activityData);

      // 入力データ事前確認
      if(!activityData.event){
        alert("イベント名を入力ください")
        return 
      }

      if(!activityData.time){
        alert("時間を入力ください")
        return 
      }

      if(!activityData.member1){
        alert("イベント１が必須項目で、入力ください")
      }
      // メンバー２～３が必須ではなくて、空白の場合まま登録する
      if(!activityData.member2){
        activityData['member2'] = ''
      }

      if(!activityData.member3){
        activityData['member3'] = ''
      }

      if(!activityData.member4){
        activityData['member4'] = ''
      }


      console.log('new activityData',activityData)



      const {event,time,member1,member2,member3,member4} = activityData;

    
      const createActivityInput = {
        id: uuid(),
        event,
        time,
        member1,
        member2,
        member3,
        member4
      }
      await API.graphql(graphqlOperation(createActivity,{input: createActivityInput}))
      onUpload(); // set seen/unseen button & fetch data from cloud.

    }

    return (
      <div className="newActivity">
        <TextField
          label="Event"
          value={activityData.event}
          onChange={e => setActivityData({ ...activityData, event: e.target.value })}
        />
        <TextField
          label="Time"
          type="time"
          value={activityData.time}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setActivityData({ ...activityData, time: e.target.value })} />
        <TextField
          label="Member1"
          value={activityData.member1}
          onChange={e => setActivityData({ ...activityData, member1: e.target.value })} />
        <TextField
          label="Member2"
          value={activityData.member2}
          onChange={e => setActivityData({ ...activityData, member2: e.target.value})} />
        <TextField
          label="Member3"
          value={activityData.member3}
          onChange={e => setActivityData({ ...activityData, member3: e.target.value })} />
        <TextField
          label="Member4"
          value={activityData.member4}
          onChange={e => setActivityData({ ...activityData, member4: e.target.value })}
        />
  
      
       
        <ExpandLessIcon onClick={uploadActivity} />
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


              <div>Event: {activity.event}</div>
              <div>Time: {activity.time}</div>
              <div>Member1: {activity.member1}</div>
           
              {activity.member2 ? (<div>Member2: {activity.member2}</div>): <div></div>}
              {activity.member3 ? (<div>Member3: {activity.member3}</div>):<div></div>}
              {activity.member4 ? (<div>Member4: {activity.member4}</div>):<div></div>}
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

export default ApiTest;

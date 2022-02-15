import React, { useEffect, useState } from 'react';
import awsExports from "../../aws-exports"
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { Container, Button, Form } from 'react-bootstrap';
import { listActivitys } from '../../graphql/queries'
import { Paper, IconButton } from '@material-ui/core';



Amplify.configure(awsExports);

// Post method test
async function addContact() {
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      message: formState.message
    }
  };

  console.log(data);
  const apiData = await API.post('formapi', '/contact', data);
  console.log({ apiData });
  alert('Mail sent');
}

const formState = { name: '', email: '', message: '' };

function updateFormState(key, value) {
  formState[key] = value;
}



function ApiTest() {

  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchActivity()
  }, []);

  const fetchActivity = async () => {
    try {
      const activityData = await API.graphql(graphqlOperation(listActivitys))
      const activityList = activityData.data.listActivitys.items;
      console.log('activity list', activityList);
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

 


  return (
    <Container>
      <div>
        <h3>Get in touch</h3>
        <br />
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" onChange={e => updateFormState('name', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" onChange={e => updateFormState('email', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control placeholder="Message" onChange={e => updateFormState('message', e.target.value)} />
          </Form.Group>
          <Form.Group>


          </Form.Group>
          <Button onClick={addContact}>Send a message</Button>
        </Form>

        GraphQL API Test Part
        <div>
          {activities.map((activity, idx) => {
            return <Paper variant='outlined' elevation={2} key={`activity${idx}`}>


              <div>Event: {activity.event}</div>
              <div>Time: {activity.time}</div>
              <div>Member1: {activity.member1}</div>
              <div>Member2: {activity.member2}</div>
              <div>Member3: {activity.member3}</div>
              <div>Member4:{activity.member4}</div>
            </Paper>
          })}
        </div>


      </div>
    </Container>
  );
}

export default ApiTest;
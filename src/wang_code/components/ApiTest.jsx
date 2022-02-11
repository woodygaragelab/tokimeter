import React, { useEffect, useState } from 'react';
import awsExports from "../../aws-exports"
import Amplify, { graphqlOperation } from "aws-amplify";
import { API } from 'aws-amplify';
import { Container, Button, Form } from 'react-bootstrap';
import {listActivitys} from '../../graphql/queries'

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

  const [activities,setActivities] = useState([])

  useEffect(() =>{
    fetchActivity()
  },[]);

  const fetchActivity = async () =>{
    try {
      const activityData = await API.graphql(graphqlOperation(listActivitys))
      const activityList = activityData.data.listActivitys.items;
      console.log('activity list',activityList);
      setActivities(activityList)
    } catch (error) {
        console.log('error on fetching activities',error)
    }
  }



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

        

      </div>
    </Container>
  );
}

export default ApiTest;

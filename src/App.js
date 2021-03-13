import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listPersons } from './graphql/queries';
import { createPerson as createPersonMutation, deletePerson as deletePersonMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  //useEffect(() => {  fetchPersons(); }, []);
  async function fetchPersons() {
    const apiData = await API.graphql({ query: listPersons });
    const personsFromAPI = apiData.data.listPersons.persons;
    await Promise.all(personsFromAPI.map(async person => {
      if (person.image) {
        const image = await Storage.get(person.image);
        person.image = image;
      }
      return person;
    }))
    setPersons(apiData.data.listPersons.persons);
  }


  return (
    <div className="App">
      <h1>Tokimeter</h1>
      <div style={{marginBottom: 30}}>
        {
          items.map(item => (
            <Card>
            <Card.Body>
              {/* <div key={item.id || item.name}> */}
              <div class="container-fluid">
              <div class="row">
                <div class="col-4">
                  <img src={item.image} style={{width: 50,height:50}}/>
                </div>
                <div class="col-6">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
                <div class="col-2">
                  <Button onClick={() =>  deleteItem(item)} variant="outline-primary">Delete</Button>
                </div>
              </div>              
              </div>              
            </Card.Body>
            </Card>
          ))
        }
      </div>






    {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <AmplifySignOut />
    </div>
  );
}

//export default App;
export default withAuthenticator(App);

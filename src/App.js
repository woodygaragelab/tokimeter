//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listPersons } from './graphql/queries';
import { createPerson as createPersonMutation, deletePerson as deletePersonMutation } from './graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const initialFormState = { name: '', description: '' }

function App() {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {  fetchPersons(); }, []);
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
  async function createPerson() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createPersonMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setPersons([ ...persons, formData ]);
    setFormData(initialFormState);
  }

  async function deletePerson({ id }) {
    const newPersonsArray = persons.filter(person => person.id !== id);
    setPersons(newPersonsArray);
    await API.graphql({ query: deletePersonMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchPersons();
  }



  return (
    <div className="App">
      <h1>Tokimeter</h1>
      <div style={{marginBottom: 30}}>
        {
          persons.map(person => (
            <Card>
            <Card.Body>
              {/* <div key={person.id || person.name}> */}
              <div class="container-fluid">
              <div class="row">
                <div class="col-4">
                  <img src={person.image} style={{width: 50,height:50}}/>
                </div>
                <div class="col-6">
                  <div>{person.name}</div>
                  <div>{person.description}</div>
                </div>
                <div class="col-2">
                  <Button onClick={() =>  deletePerson(person)} variant="outline-primary">Delete</Button>
                </div>
              </div>              
              </div>              
            </Card.Body>
            </Card>
          ))
        }
      </div>

      <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <Button onClick={createPerson} variant="outline-primary">ADD</Button>
        </div>
        <div class="col-3">
          <input
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder="name"
            value={formData.name}
          />
        </div>
        <div class="col-3">
          <input
            onChange={e => setFormData({ ...formData, 'description': e.target.value})}
            placeholder="description"
            value={formData.description}
          />
        </div>
        <div class="col-3">
          <input
            type="file"
            onChange={onChange}
          />
        </div>
      </div>              
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

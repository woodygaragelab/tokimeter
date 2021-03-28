import React from 'react';
import { Component } from 'react';
import './listpage.css';
//import { API, Storage } from 'aws-amplify';
//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
//import { Auth } from 'aws-amplify';
//import { listItems } from './graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash,faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//const initialFormState = { name: '', description: '', image: '', imageFile: '', imageUrl: '' }
const initialItemState = [{ name: 'aaa', description: 'xxx' },
                          { name: 'bbb', description: 'yyy' },
                         ]

class ListPage extends Component {

  constructor(props){
    super(props);
    this.fetchItems = this.fetchItems.bind(this);
    this.fetchItemsFromAPI = this.fetchItemsFromAPI.bind(this);
    this.state = {
      items: initialItemState
    };
    //this.fetchItems();
    this.fetchItemsFromAPI();

  }

  async fetchItems() {
    this.state = {items:initialItemState}
    // const apiData = await API.graphql({ query: listItems });
    // const itemsFromAPI = apiData.data.listItems.items;
    // await Promise.all(itemsFromAPI.map(async item => {
    //   if (item.imageFile) {
    //     const imageUrl = await Storage.get(item.imageFile);
    //     item.imageUrl = imageUrl;
    //   }
    //   return item;
    // }))
    // this.setState({items: apiData.data.listItems.items});
  }



  async fetchItemsFromAPI() {
    this.state = {items:initialItemState}

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({"function":"list","category":"food"});
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };
          fetch("https://yxckp7iyk4.execute-api.ap-northeast-1.amazonaws.com/dev", requestOptions)
          .then(response => response.text())
          .then((response) => {
            alert(response);
            this.setState({items: JSON.parse(response)});
          })
          .catch(error => console.log('error', error));

    }
  

      // <button type="button" onclick="callAPI(document.getElementById('fName').value,document.getElementById('lName').value)">Call API</button>



  render() {

    return (
      <div style={{marginBottom: 30}}  className="container-fluid">
        <h1>Tokimeter 0329</h1>

        {
          this.state.items.map(item => (
            <div key={item.id || item.name}>
            <Card>
            <Card.Body>
              {/* <div className="container-fluid"> */}
              <div className="row">
                <div className="col-4">
                  <img src={item.imageUrl} style={{width: 50,height:50}} alt=""/>
                </div>
                <div className="col-6">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
                {/* {this.state.username && */}
                  <div className="col-2">
                    <Button 
                      onClick={() =>  this.editItem(item)} variant="outline-primary">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() =>  this.deleteItem(item)} variant="outline-primary">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                {/* } */}
              </div>              
              {/* </div>               */}
            </Card.Body>
            </Card>
            </div>              
          ))
        }

      </div>
    );
  }
}

export default withRouter(ListPage)  
      
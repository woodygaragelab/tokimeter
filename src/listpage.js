import React from 'react';
import { Component } from 'react';
import './listpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEdit,faTrash,faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const initialItemState = [{ name: 'aaa', description: 'xxx' },
                          { name: 'bbb', description: 'yyy' },
                         ]

class ListPage extends Component {

  constructor(props){
    super(props);
    // this.fetchItems = this.fetchItems.bind(this);
    // this.fetchItemsFromAPI = this.fetchItemsFromAPI.bind(this);
    this.state = {
      items: initialItemState
    };

  }



  render() {

    return (
      <div style={{marginBottom: 30}}  className="container-fluid">
        <h1>Tokimeter 0329</h1>

        {/* {
          this.state.items.map(item => (
            <div key={item.id || item.name}>
            <Card>
            <Card.Body>
              <div className="row">
                <div className="col-4">
                  <img src={item.imageUrl} style={{width: 50,height:50}} alt=""/>
                </div>
                <div className="col-6">
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
                  <div className="col-2">
                    <Button 
                      onClick={() =>  this.editItem(item)} variant="outline-primary">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() =>  this.deleteItem(item)} variant="outline-primary">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
              </div>              
            </Card.Body>
            </Card>
            </div>              
          ))
        } */}

      </div>
    );
  }
}

export default withRouter(ListPage)  
      
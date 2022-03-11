import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Box } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

class UploadPageHT extends Component{

  constructor(props) {
    super(props);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.state = {
      imagefilename: "",
      imageurl: ""
    };
  }
  
  async onChangeImage(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    this.setState({imagefile: file.name });
    // imageFileをStorage(s3 service)に保存する
    await Storage.put(file.name, file,{ level: 'public' }); // publicにしないとStorage.getできない
    if (this.state.imagefile) {
      // imageFile名からimageUrlを取得する
      const imageurl = await Storage.get(this.state.imagefile);
      this.setState({imageurl: imageurl});
    }
  }

  
  render(){
    return(
      <div className="container-fluid">
      <form>
        <div className="form-group">
          <img src={this.state.imageurl} style={{width: 100,height:100}} alt=""/>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" className="form-control" onChange={this.onChangeImage}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <AddAPhotoIcon />
            </IconButton>
          </label>
        </div>
      </form>
    </div>
    )
  }
}

export default withRouter(UploadPageHT);

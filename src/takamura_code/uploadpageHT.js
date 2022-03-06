import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

// const TIMEZONEOFFSET = -9;     // UTC-表示したいタイムゾーン(単位:hour)。JSTなら-9

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
          <input
             type="file" className="form-control" id="itemimage"
             onChange={this.onChangeImage}
          />
        </div>
      </form>
    </div>
    )
  }
}
{/* <p>imageUrl:{this.state.item.imageurl}</p> */}


export default withRouter(UploadPageHT);

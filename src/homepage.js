import React from 'react'
import { Component } from 'react';

import './App.css';
//import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import {useSpring, animated} from 'react-spring'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {

  const [toggle, setToggle] = useState(0);
  const changeToggle = () => setToggle(toggle === 1 ? 0 : toggle + 1)
  useEffect( () => void setTimeout(() => changeToggle(), 1000), [changeToggle] );
  const spring = useSpring(
    {color: toggle ? "#ffaaaa" : "red",
     backgroundColor:"#ffffff44",
     textAlign:"center",
     fontSize: toggle ? "48pt": "96pt",
     opacity: 1.0,
     transform: toggle ? 'translate(0%,200%)':'translate(0%,80%)', 
     from: {color: "#ff0000"},
     config: { mass: 1, tension: 100, friction: 50 }
    })
 
  return (
    <div onClick={() => changeToggle()}>
     <animated.div style={spring}>
        <FontAwesomeIcon icon={faHeart} />
      </animated.div>  
    </div>
  );
};

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
    };  
  }

  selectHeart = () => {  this.props.history.push({ pathname: '/heartpage' });  }

  render() {
    return (
      <div>
          <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
          <div className="kzFace m-1"></div>

          <div className="kzMenu kozi-color-1 kozi-font-1 m-4" onclick={this.selectHeart}>
            <FontAwesomeIcon icon={faChartLine}/>
            イベントを記録
            </div>
          <div className="kzMenu kzColor1 kzFont1 m-4" onclick={this.selectHeart}>メッセージを記録</div>
          <div className="kzMenu kzColor1 kzFont1 m-4" onClick={this.selectHeart}>
            <FontAwesomeIcon icon={faHeart}/>
            Heartを表示
          </div>

        <footer className="kzFooter">
          <FontAwesomeIcon icon={faHome} />
          <FontAwesomeIcon icon={faChartLine} />
          <FontAwesomeIcon icon={faHeart} onClick={this.selectHeart} />
        </footer>
      </div>
    );
  }
}
export default withRouter(HomePage) 
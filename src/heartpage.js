import React from 'react'
import { Component } from 'react';

import './App.css'
import { useState } from 'react';
import { useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import {useSpring, animated} from 'react-spring'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";

export const Heart = () => {

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
}

class HeartPage extends Component {

  constructor(props){
    super(props);
    this.state = {
    };  
  }

  selectHome = () => { this.props.history.push({ pathname: '/homepage' });  }

  render() {
    return (
      <div>
        {/* <div className="mb-3 kozi-color-1 kozi-font-1">Kozipro</div> */}
        <div className="kzHeader kzColor1 kzFont1">Kozipro</div>
        <Heart></Heart>
        <footer className="kzFooter">
          <FontAwesomeIcon icon={faHome}  onClick={this.selectHome}/>
          <FontAwesomeIcon icon={faChartLine} />
          <FontAwesomeIcon icon={faHeart} />
        </footer>
      </div>
    );
  }
}
export default withRouter(HeartPage)  

import React from 'react'
//import './styles.css'
import './App.css'
import { useState } from 'react';
import { useEffect} from 'react';

import {useSpring, animated} from 'react-spring'
//import { config } from 'react-spring'
//import { Transition} from 'react-spring'
//import {useTransition} from 'react-spring'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";

//export default function App() {
const App = () => {

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
      <header className="siteHeader">
        <div>Kozipro</div>
        {/* <div>{toggle}</div> */}
      </header>

      <animated.div style={spring}>
        <FontAwesomeIcon icon={faHeart} />
      </animated.div> 
 
      <footer className="siteFooter">
        <FontAwesomeIcon icon={faHome} />
        <FontAwesomeIcon icon={faChartLine} />
        <FontAwesomeIcon icon={faHeart} />
      </footer>

    </div>
  );


};

export default App;

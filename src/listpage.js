import React from 'react'
import { Transition, animated } from 'react-spring'
import './listpage.css'
import { withRouter } from 'react-router-dom';

const pages = [
  style => (
    <animated.div style={{ ...style, background: '#b3FFBD' }}>A</animated.div>
  ),
  style => (
    <animated.div style={{ ...style, background: '#B2DBBF' }}>B</animated.div>
  ),
  style => (
    <animated.div style={{ ...style, background: '#12DBBF' }}>C</animated.div>
  ),
]


//export default class App extends React.PureComponent {
class ListPage extends React.PureComponent {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     toggled: true
  //   };  
  // }
  state = { index: 0 }
  toggle = e =>
    this.setState(state => ({
      index: state.index === 2 ? 0 : state.index + 1,
    }))
  render() {
    return (
      <div className="main" onClick={this.toggle}>
        <h1>0329 1500</h1>
        {/* <Transition
          native
          reset
          unique
          items={this.state.index}
          from={{ opacity: 0, transform: 'translate3d(100%,0,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(-50%,0,0)' }}>
          {index => pages[index]}
        </Transition> */}
      </div>
    )
  }
}
export default withRouter(ListPage)  

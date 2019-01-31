import React, { Component } from 'react';
import './App.css';
import Googlyeyes from './googlyeyes'
import mds from './img/MiyIbYRT.png';

class App extends Component {

  takePicture()
  {
    this.refs.googlyeyes.picture();
  }
  constructor(){
    super();
    this.state = {
      toggle : false

    }
  }


  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({toggle : !this.state.toggle})} className="btn, menuButton"><i className="fa fa-bars"> </i></button>
        <div className={"menu " + (this.state.toggle ? 'open' : '')}>

          <img className="mds" src={mds}/>
        </div>
        <button className={"screen"} onClick={() => this.takePicture()}>PRESS</button>
        <Googlyeyes ref={"googlyeyes"}> </Googlyeyes>
      </div>
    );
  }
}

export default App;

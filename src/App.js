import React, { Component } from 'react';
import './App.css';
import Googlyeyes from './googlyeyes'

class App extends Component {

  takePicture()
  {
    this.refs.googlyeyes.picture();
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.takePicture()}>PICTURE</button>
        <Googlyeyes ref={"googlyeyes"}> </Googlyeyes>
      </div>
    );
  }
}

export default App;

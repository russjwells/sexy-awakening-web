import React, { Component } from 'react';

import phoenixred from './phoenix_red.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={phoenixred} className="App-logo" alt="logo" />
          <h1 className="App-title">Sexy Awakening</h1>
        </header>
        <p className="App-intro">
          Web App
        </p>
      </div>
    );
  }
}

export default App;

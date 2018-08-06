import React, { Component } from 'react';

import phoenixred from './phoenix_red.svg';
import './App.css';

class App extends Component {

  state = {
    loggedIn:false,
  }
  
  render() {
    const loggedIn = this.state.loggedIn
    return (
          <div className="App">
          {loggedIn ? (
            <div>
              <header className="App-header">
              <img src={phoenixred} className="App-logo" alt="logo" />
                <h1 className="App-title">Sexy Awakening</h1>
              </header>
              <p className="App-intro">
                Web App {loggedIn && (
                  <div>holla</div>
                )}
              </p>
            </div>
          ):(
            <div>
              <header className="App-header">
              <img src={phoenixred} className="App-logo" alt="logo" />
                <h1 className="App-title">Sexy Awakening</h1>
              </header>
              <p className="App-intro">
                Web App {loggedIn && (
                  <div>holla</div>
                )}
              </p>
            </div>
          )}
          </div>
        )
  }
}

export default App;

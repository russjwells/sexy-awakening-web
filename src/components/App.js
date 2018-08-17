import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';


import FacebookButton from './facebookButton'
import Home from '.././screens/home'
import Login from '.././screens/login'


import './App.css';

class App extends Component {

  state = {
    loggedIn:false,
    user:data,
  }
  login = () => {
    this.setState({loggedIn:true})
    //console.log('wwaaahhahaha')
    //alert('wwaaahhahaha')
  }
  clicked() {
    console.log('clicked')
  }
  
  render() {
    const loggedIn = this.state.loggedIn
    return (
          <div className="App">
          {loggedIn ? (
            <Home user={this.state.user}/>
          ):(
            <Login login={this.login}/>
          )}
          </div>
        )
  }
}

const data = {
  first_name: 'bob',
  last_name: 'johnson',
  email: 'wahoo@gmail.com'
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around'
  },
});


export default App;

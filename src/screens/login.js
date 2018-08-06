import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import phoenixred from '../phoenix_red.svg';
import FacebookButton from '../components/facebookButton'
import NavBar from '../components/navBar'

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div style={styles.container}>
              {<NavBar />}
              <p className="App-intro">
                Welcome, please login: {this.props.userData && (
                  <div>holla</div>
                )}
              </p>
              {<FacebookButton onClick={this.props.login}/>}
            </div>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around'
    },
    content:{
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around'
    },
  });
  
  
  export default Login;
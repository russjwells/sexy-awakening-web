import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import phoenixred from '../phoenix_red.svg';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div style={styles.container}>
                <header className="App-header">
                    <img src={phoenixred} className="App-logo" alt="logo" />
                    <h1 className="App-title">Sexy Awakening</h1>
                </header>
                <p className="App-intro">
                    Welcome home, {this.props.user.first_name}!
                </p>
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
  });
  
  
  export default Home;
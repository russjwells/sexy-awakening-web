import React, { Component } from 'react';
//import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase';
import {Dimensions, Animated, View, Text, StyleSheet}  from 'react-primitives'

const {width, height} = Dimensions.get('window')

class WebScroller extends Component {

    state = {
      numScreens: this.props.screens.length,
      currentScreen: 0,
    }
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user: this.props.user,
            activeScreen: this.props.activeScreen
          };
    }

    componentDidMount() {
      /*
        db.onceGetUsers().then(snapshot =>
          this.setState({ users: snapshot.val() })
        );
        */
    }

    render(){
        //const {users} = this.state;
        //const user = this.state.user;
        const {width, height} = Dimensions.get('window')
        const view = this.state.activeScreen;
        return (
            <View style={styles.content}>
                <View style={styles.flex}>
                  
                  {// !!users && <UserList users={users} /> 
                  }
                  <Text>Welcome to Sexy Awakening!</Text>
                  {//<p>{user.email}</p>
                  }
                </View>
            </View>
        )
    }
}
/*
const UserList = ({ users }) =>
  <div>
    <h2>List of First Names of Users</h2>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].first_name}</div>
    )}
  </div>
*/
const styles = StyleSheet.create({
    content: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      flexDiretion: 'column'
    },
    flex: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        flexDiretion: 'column'
    }
});
  
  
export default WebScroller
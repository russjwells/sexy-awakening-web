import React, { Component } from 'react';
//import { StyleSheet, css } from 'aphrodite';
//import { db } from '../firebase';
import {Dimensions, Animated, View, Text, StyleSheet}  from 'react-primitives'
//import Profile from '../screens/profile'
//import Matches from '../screens/matches'
//import Swipes from '../screens/swipes'

const {width, height} = Dimensions.get('window')

class WebScroller extends Component {

    state = {
      numScreens: this.props.screens.length,
      currentScreen: 0,
    }
    constructor(props) {
        super(props);
        this.state = {
            //users: null,
            //user: this.props.user,
            activeScreen: this.props.activeScreen
          };
    }

    render(){
        //const {users} = this.state;
        //const user = this.state.user;
        const {width, height} = Dimensions.get('window')
        const view = this.state.activeScreen;
        return (
            <View style={styles.content}>
                <View style={styles.flex}>
                  {this.props.screen==="profile" && (
                    this.props.screens[0]
                  )}
                  {this.props.screen==="swipes" && (
                    this.props.screens[1]
                  )}
                  {this.props.screen==="matches" && (
                    this.props.screens[2]
                  )}
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
        flexDiretion: 'row'
    }
});
  
  
export default WebScroller
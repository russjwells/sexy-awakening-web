import React, { Component } from 'react';
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
            activeScreen: this.props.activeScreen
          };
    }

    render(){
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
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-primitives'

class Matches extends Component {

render(){
    return(
        <View style={styles.matches}>
            <Text style={styles.text}>
                Match Lists
            </Text>
        </View>
    );
}}

const styles = StyleSheet.create({
    matches: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'grey',
        alignSelf: 'center'
    }
});


export default Matches;
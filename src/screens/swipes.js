import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-primitives'

class Swipes extends Component {

render(){
    return(
        <View style={styles.swipes}>
            <Text style={styles.text}>
                Swipes
            </Text>
        </View>
    );
}}

const styles = StyleSheet.create({
    swipes: {
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
        color: 'white',
        alignSelf: 'center'
    }
});


export default Swipes;
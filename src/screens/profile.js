import React, {Component} from 'react'
//import * as firebase from 'firebase'
import {View, Text, StyleSheet} from 'react-primitives'

class Profile extends Component {

render(){
    return(
        <View style={styles.profile}>
            <Text style={styles.text}>
                Profile
            </Text>
        </View>
    );
}}

const styles = StyleSheet.create({
    profile: {
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
        color: 'black',
        alignSelf: 'center'
    }
});

export default Profile;
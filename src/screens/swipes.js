import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-primitives'

function Swipes (props) {
    return(
        <View style={styles.swipes}>
            <Text style={styles.text}>
                You'll be able to swipe here soon enough. <br />For now swipe on our mobile app.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    swipes: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
    }
});


export default Swipes;
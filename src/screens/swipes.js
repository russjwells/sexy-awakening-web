import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-primitives'

function Swipes (props) {
    return(
        <View style={styles.swipes}>
            <Text style={styles.text}>
                There's no one here (o:)
            </Text>
        </View>
    )
}

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
        color: 'grey',
        alignSelf: 'center',
        justifyContent: 'space-around',
    }
});


export default Swipes;
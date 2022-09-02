import React, {Component, useContext} from 'react'
import {View, Text, StyleSheet, Image} from 'react-primitives'
import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'
import Card from '../components/card'

function Swipes (props) {
    return(
        <View style={styles.swipes}>
            <View>
                <Image source={romanceSymbol} style={{width:30, height:30}} />
            </View>
            <View style={styles.swipesMiddle}>
                <View>
                    <Image source={friendshipSymbol} style={{width:30, height:30}} />
                </View>
                <View>
                    <Card />
                    <Text style={styles.text}>
                        You'll be able to swipe here soon enough. <br />For now swipe on our mobile app.
                    </Text>
                </View>
                <View>
                    <Image source={sexSymbol} style={{width:60, height:60}} />
                </View>
            </View>
            <View><Image source={passSymbol} style={{width:30, height:30}} /></View>
            
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
      backgroundColor: 'white',
      marginBottom: '20px'
    },
    swipesMiddle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '20px',
        //marginRight: '20px',
        //marginLeft: '20px'
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
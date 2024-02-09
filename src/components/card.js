import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-primitives'
import seedBlk from '../img/seedoflife_black.png'
import axios from 'axios'

const Card = () => {
    return(
        <View style={styles.card}>
            <Image source={seedBlk} style={{width:300, height:300}} />
            <Text style={styles.name}>Name</Text>

            
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: '300px',
        height: '300px',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
    },
    name: {
        marginTop: '-30px',
        marginLeft: '10px',
        fontSize: '16px'
    }
});
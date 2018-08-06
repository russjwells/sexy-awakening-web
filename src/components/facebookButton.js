import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';

import {FaBeer} from 'react-icons/fa'

//import Icon from '@expo/vector-icons/FontAwesome'

export default class FacebookButton extends Component {
    render(){
        return(
            <button
                style={styles.button}
                onClick={this.props.onClick}
            >
            <div style={styles.buttonContainer}>
                <FaBeer />
                <p style={styles.buttonText}>Login with Facebook</p>
            </div>
            </button>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        width: 220,
        backgroundColor: '#3b5998',
        borderRadius: 50
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
    }
})
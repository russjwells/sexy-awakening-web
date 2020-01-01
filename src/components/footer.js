import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import phoenixred from './phoenix_red.svg';

import {FaBeer} from 'react-icons/fa'

//import Icon from '@expo/vector-icons/FontAwesome'

export default class Footer extends Component {
    render(){
        return(
            <div className={css(styles.footer)}>
                <p>Sexy Awakening 2020</p>
            </div>
        )
    }
}

//export default NavBar;


const styles = StyleSheet.create({
    footer:{
        display: 'flex',
        flex: -1,
        backgroundColor: '#e54560',
        height: 30,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    flex:{
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import phoenixred from '../phoenix_red.svg';

import {FaBeer} from 'react-icons/fa'

//import Icon from '@expo/vector-icons/FontAwesome'

export default class NavBar extends Component {
    render(){
        return(
            <header className={css(styles.nav)}>
                <img src={phoenixred} className="App-logo" alt="logo" />
                <div className={css(styles.title)}>Sexy Awakening</div>
            </header>
        )
    }
}

//export default NavBar;


const styles = StyleSheet.create({
    nav:{
        display: 'flex',
        flex:1,
        backgroundColor: '#fff',
        height: 100,
        padding: 20,
        color: '#e54560',
        flexDirection: 'row',
        justifContent: 'center',
        alignItems: 'center',
    },
    title:{
        display: 'flex',
        flex:1,
        backgroundColor: '#fff',
        height: 100,
        padding: 20,
        color: '#e54560',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
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
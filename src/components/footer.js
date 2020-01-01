import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';

export default class Footer extends Component {
    render(){
        return(
            <div className={css(styles.footer)}>
                <p>Sexy Awakening 2020</p>
            </div>
        )
    }
}

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
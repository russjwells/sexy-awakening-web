import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import './Footer.css'

export default class Footer extends Component {
    render(){
        return(
            <div className={css(styles.footer)}>
            <p><a href="https://www.sexyawakening.com/terms-of-service/">Terms of Service</a></p> <p><a href="https://www.sexyawakening.com/privacy-policy/">Privacy Policy</a></p><p>Contact Us</p><p>&copy; 2021 Sexy Awakening LLC</p>
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
        justifyContent: 'space-evenly',
        //marginBottom: '20px'
    },
    flex:{
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
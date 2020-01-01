import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import phoenixred from './phoenix_red.svg';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

//import Icon from '@expo/vector-icons/FontAwesome'

export default class Header extends Component {
    render(){
        return(
            <div className={css(styles.nav)}>
                <div className={css(styles.left)}>
                    <div></div>
                </div>
                <div className={css(styles.center)}>
                    <div className={css(styles.titleHolder)}>
                        <div className={css(styles.flex)}>
                            <Link to={routes.LANDING}>
                                <img src={phoenixred} className={css(styles.logo)} alt="logo" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={css(styles.right)}>
                    <div></div>
                </div>
            </div>
        )
    }
}

//export default NavBar;


const styles = StyleSheet.create({
    flex:{
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    nav:{
        display: 'flex',
        flex:-1,
        backgroundColor: '#fff',
        height: '100px',
        //padding: 20,
        color: '#e54560',
        flexDirection: 'row',
        justifContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'skyblue'
    },
    left:{
        flex: 1,
        display: 'flex',
        backgroundColor: 'lightblue',
    },
    center:{
        flex: 7,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: 'blue',
        flexDirection: 'row',
    },
    right:{
        flex: 1,
        display: 'flex',
        backgroundColor: 'darkblue',
    },
    logo:{
        width: 60,
        height: 60,
    },
    titleHolder:{
        display: 'flex',
        flex:0,
        flexDirection: 'row',
    },
    title:{
        display: 'flex',
        
        //backgroundColor: '#fff',
        height: 100,
        minWidth: 300, 
        
        color: '#e54560',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        fontSize: 36,
        fontWeight: 'bold',
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
import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';
//import {Text} from 'react-primitives'

import phoenixred from './phoenix_red.svg';
import { StyleSheet, css } from 'aphrodite';

const Menu = () => 
    <div className={css(styles.menu)}>
        <div className={css(styles.top)}>
            <img src={phoenixred} className={css(styles.logo)} alt="logo" />
        </div>
        <div className={css(styles.version)}>
            <p className={css(styles.versionText)}>Sexy Awakening</p>
        </div>
        <div className={css(styles.menu)}>
        <div className={css(styles.menuItem)}>
                 <Link to={routes.ABOUT}>About</Link>
            </div>
            <div className={css(styles.menuItem)}>
                 <Link to={routes.ACCOUNT}>Account</Link>
            </div>
            <div className={css(styles.menuItem)}>
                <SignOutButton />
            </div>
        </div>
    </div>

const styles = StyleSheet.create({
    menu: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection:'column',
      backgroundColor: '#fff',
    },
    logo:{
        width: 80,
        height: 80,
        
    },
    logoHolder:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        flexDirection:'row',
    },
    top:{
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingTop: '10'
    },
    menuItem:{
        height:100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    version:{
        backgroundColor:'white',
    },
    versionText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#e54560',
    },
    titleText:{
        color: '#e54560',
        fontWeight: 'bold'
    },
  });

  export default Menu;
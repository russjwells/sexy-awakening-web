import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

import phoenixred from './phoenix_red.svg';
import { StyleSheet, css } from 'aphrodite';

const Menu = () => 
    <div className={css(styles.container)}>
        <img src={phoenixred} className={css(styles.logo)} alt="logo" />
        <p>Sexy Awakeing Beta</p>
        <ul>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton /></li>
        </ul>
    </div>

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection:'column',
      backgroundColor: '#fff'
    },
    logo:{
        width: 80,
        height: 80,
    },
  });

  export default Menu;
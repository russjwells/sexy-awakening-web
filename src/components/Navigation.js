import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import phoenixred from './phoenix_red.svg';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
<div className={css(styles.nav)}>
  <div className={css(styles.left)}>
      <div>menu</div>
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
      <div>matches</div>
  </div>
</div>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;

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
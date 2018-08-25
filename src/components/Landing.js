import React from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import AuthUserContext from './AuthUserContext';
import phoenixred from './phoenix_red.svg';
import { StyleSheet, css } from 'aphrodite';

const LandingPage = () =>
<AuthUserContext.Consumer>
{authUser => authUser
  ? <LandingAuth />
  : <LandingNonAuth />
}
</AuthUserContext.Consumer>

const LandingAuth = () =>
<div className={css(styles.container)}>
  <h1>Sexy Awakening</h1>
  <p>Swipe with intention</p>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>
</div>

const LandingNonAuth = () =>
<div className={css(styles.container)}>
  <img src={phoenixred} className={css(styles.logo)} alt="logo" />
  <h1 className={css(styles.text)}>Sexy Awakening</h1>
  <p className={css(styles.text)}>SWIPE WITH INTENTION</p>
  <p >
    <Link to={routes.SIGN_IN}>Sign In</Link>
    &nbsp;|&nbsp; 
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
    
  
</div>

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: '#fff'
  },
  logo:{
      width: 80,
      height: 80,
  },
  text:{
    color: '#e54560',
  },
});
export default LandingPage;
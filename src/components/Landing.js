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
<div>
  <h1>Sexy Awakening</h1>
  <p>Swipe with intention</p>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>
</div>

const LandingNonAuth = () =>
<div>
  <img src={phoenixred} className={css(styles.logo)} alt="logo" />
  <h1>Sexy Awakening</h1>
  <p>Swipe with intention</p>
  <ul>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
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

export default LandingPage;
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
  <h1>Welcome to Sexy Awakening</h1>
  <p>Swipe w/ intention</p>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>
</div>

const LandingNonAuth = () =>
<div>
  <h1>Welcome to Sexy Awakening</h1>
  <p>Swipe w/ intention</p>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>
</div>

export default LandingPage;
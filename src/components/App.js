import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { StyleSheet, css } from 'aphrodite';

//import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from '../screens/home';
import AccountPage from './Account';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>
    <Router>
      <div className={css(styles.container)}>
        <Route
          exact path={routes.LANDING}
          component={() => <HomePage />}
        />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
        <Route
          exact path={routes.HOME}
          component={() => <HomePage />}
        />
        <Route
          exact path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
      </div>
  </Router>


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection:'column',
  },
});
  
export default withAuthentication(App);
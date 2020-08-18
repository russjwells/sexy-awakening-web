import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { StyleSheet, css } from 'aphrodite';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import Home from '../screens/home';
import Account from './Account';
import About from './About';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication'
import withUserData from './withUserData'
import UserDataContext from './UserDataContext';

const App = () =>
    <Router>
        <div className={css(styles.container)}>
          <UserDataContext.Provider>
            <Route
              exact path={routes.LANDING}
              component={() => <Home />}
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
              exact path={routes.ACCOUNT}
              component={() => <Account />}
            />
            <Route
              exact path={routes.ABOUT}
              component={() => <About />}
            />
          </UserDataContext.Provider>
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
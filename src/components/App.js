import React, {useState, useEffect, useContext, useMemo} from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { StyleSheet, View} from 'react-primitives';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import Home from '../screens/home';
import Account from './Account';
import About from './About';
import EditProfile from '../screens/editProfile';
import Settings from '../screens/settings';
import YourProfile from '../screens/yourProfile';
import Chat from '../screens/chat';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication'

import UserDataContext from './UserDataContext'
import userDataDefaults from '../constants/defaults'

function App (props) {
    //const [authUser, setAuthUser] = useState(null)
    const [userData, setUserData] = useState(userDataDefaults)
    const providerValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData])
    useEffect(() => {
      /*
      console.log("use effect app level " + JSON.stringify(authUser))
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null)
      });
      console.log("use effect app level fin " + JSON.stringify(authUser))
      */
    }, [])

    return (
      <Router>
        <View style={styles.container}>
          <UserDataContext.Provider value={providerValue}>
            <Route
              exact path={routes.LANDING}
              component={Home}
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
              component={Account}
            />
            <Route
              exact path={routes.ABOUT}
              component={About}
            />
            <Route
              exact path={routes.EDITPROFILE}
              component={EditProfile}
            />
            <Route
              exact path={routes.SETTINGS}
              component={Settings}
            />
            <Route
              exact path={routes.YOURPROFILE}
              component={YourProfile}
            />
            <Route
              exact path={routes.CHAT}
              component={Chat}
            />
          </UserDataContext.Provider>
        </View>
      </Router>
    )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection:'column',
  },
});
  
export default withAuthentication(App);
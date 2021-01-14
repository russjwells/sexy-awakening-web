import React, { useContext } from 'react';
import {View, Text, Image} from 'react-primitives'
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import SignOutButton from './SignOut';
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes';
import { StyleSheet, css } from 'aphrodite';

const AccountPage = (props) => {
const authUser = useContext(AuthUserContext)
return(
  
      <View>
        <Link to={routes.LANDING} className={css(styles.link)}>Back to the app</Link>
        <h1>Account</h1>
        <Text>This is for the Sexy Awakening user account associated with {authUser.email}.</Text>
        <h2>Reset Password</h2>
        <PasswordChangeForm />
        <br />
        <h2>Payment Information</h2>
        <h2>Membership Level</h2>
        <h2>Guide Status</h2>
        <Text>Something new is opening soon.</Text>
        <h2>Log Out</h2>
        <SignOutButton />
        <br />
        <h2>Close Account</h2>
      </View>
)
}

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
  link: {
      textDecoration: 'none',
      color: '#000',
      cursor: 'pointer'
  },
  top:{
      display: 'flex',
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'column',
      paddingTop: '10',
  },
  menuItem:{
      height:100,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'center',
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

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(AccountPage);
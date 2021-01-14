import React from 'react';
import {View, Text, Image} from 'react-primitives'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes';
import { StyleSheet, css } from 'aphrodite';
import AuthUserContext from './AuthUserContext';
import withAuthorization from '../components/withAuthorization';

const About = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <View style={styles.contain}>
        <Text style={{fontSize:20, margin:20, fontWeight:'bold', color:'#e54560'}}>Welcome to Sexy Awakening</Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>This is a transformational space. </Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>Sexy Awakening is creating a culture of consent and sex positivity, and promotes clear healthy boundaries so that all beings feel may safe to explore, express, and be received in compassion.</Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>We agree to honor each other and our selves with reverence and compassion in each moment as we grow more authentic, present, alive, awake, and evolved.</Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>We're here to guide your adventure into self knowledge by providing space for you to open up the deepest parts of your world, your heart, and your soul.</Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>Swipe right for sex, up for romance, left for friendship and down to pass.</Text>
        <Text style={{fontSize:15, color: 'black', margin:20}}>Thank you for coming. Enjoy your self!</Text>
        <Link to={routes.LANDING} className={css(styles.link)}>Back to the app</Link>
      </View>
    }
  </AuthUserContext.Consumer>

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
  contain: {
    width: '300px',
  }
});

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(About);
//export default About;


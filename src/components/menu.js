import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

import {View, Text, Image, StyleSheet} from 'react-primitives'
import phoenixred from './phoenix_red.svg';
import SignOutButton from './SignOut';
import UserDataContext from './UserDataContext';
import CircleAvatar from '../components/circleAvatar'


const Menu = () => {
    
    const {userData, setUserData} = useContext(UserDataContext)
    return(
    <View style={styles.container}>
        <View style={styles.top}>
            <img src={phoenixred} className={styles.logo} alt="logo" width="120px" height="120px"/>
        </View>
        <View style={styles.version}>
            <Text style={styles.versionText}>Sexy Awakening</Text>
        </View>
        <View style={styles.greeting}>
            <Text style={styles.greetingText}>Hello, {userData.first_name}!<br/></Text>
        </View>
        <View style={styles.logoHolder}>
            <CircleAvatar size={80} 
                uid={userData.uid} 
                pic={userData.picture} 
            />
        </View>
        <View style={styles.menuItems}>
        <Link to={routes.ACCOUNT}>
                <View style={styles.menuItem}>
                    <Text>
                        Account
                    </Text>
                </View>
            </Link>
            {/*
            <Link to={routes.LANDING}>
            <View style={styles.menuItem}>
                <Text>
                    Status
                </Text>
            </View>
            </Link>
            <Link to={routes.LANDING}>
            <View style={styles.menuItem}>
                <Text>
                    Inventory
                </Text>
            </View>
            </Link>
            */}
            
            <Link to={routes.ABOUT}>
            <View style={styles.menuItem}>
                <Text style={styles.menuText}>
                    About
                </Text>
            </View>
            </Link>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: '1 1 1',
      justifyContent: 'flex-start',
      flexDirection:'column',
      backgroundColor: 'white',
    },
    logo:{
        width: '80px',
        height: '80px',
    },
    logoHolder:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        flexDirection:'row',
        alignItems: 'center',
        padding: '10px 10px',
        marginTop: '10px'
    },
    link: {
        textDecorationLine: 'none',
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
        paddingTop: '10px',
    },
    menuText: {
        textDecorationLine: 'none'
    },
    menuItem:{
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    menuItems:{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        backgroundColor: 'light-blue',
        flexDirection: 'column'
    },
    version:{
        backgroundColor:'white',
    },
    versionText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#e54560',
    },
    greetingText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#e54560',
    },
    titleText:{
        color: '#e54560',
        fontWeight: 'bold'
    },
  });

  export default Menu;
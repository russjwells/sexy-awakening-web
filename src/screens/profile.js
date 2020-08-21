import React, {Component, useContext} from 'react'
import * as firebase from 'firebase'
import {View, Text, StyleSheet, Image} from 'react-primitives'

import CircleAvatar from '../components/circleAvatar'
import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';
import chemistryIcon from '../img/chemistry.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserDataContext from '../components/UserDataContext';
import UserDataHelpers from '../utils/UserDataHelpers'
import {db} from '../firebase'

function Profile (props) {
    const {user, setUser} = useContext(UserDataContext)
    const {auth, setAuth} = useContext(AuthUserContext)
    //const {auth} = useContext(AuthUserContext)
    //console.log(props.auth)
    return(
        <View style={styles.container}>
            <View style={styles.profileDisplay}>
                <View style={styles.userAvatar}>
                    <CircleAvatar size={120} 
                        uid={props.authUser.uid} 
                        pic={user.picture} 
                        onClick={() => console.log('view profile')}
                    />
                    <Text style={styles.text}>
                        {props.authUser.uid}
                        <br /><br />
                        {user.first_name}
                        
                    </Text>
                    <button
                        onClick={async () => {
                            const snap = await db.onceGetUserData(props.authUser.uid)
                            const usr = snap.val()
                            setUser(usr)
                            console.log(usr)
                            
                            //console.log(usr)
                            //setUser({usr})
                        }}
                    >fill data</button>
                </View>
            </View>
            <View style={styles.menuOptions}>
                <View style={styles.button} onClick={() => console.log('edit profile')}>
                    <FontAwesomeIcon icon={faEdit} size="2x" color="#000000" />
                    <Text>Edit Profile</Text>
                </View>
                <View style={styles.button} onClick={() => console.log('setting')}>
                    <Image source={chemistryIcon} style={{width:40, height:40}} />
                    <Text>Settings</Text>
                </View>
            </View>
        </View>
    )
}

const fillData = async(uid) => {
    console.log(uid)
    //firebase.database().ref('users').child(uid).on('value', snap => {
    //    return user = snap.val()
   // }
   return {name: "easy"}
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'black',
        alignSelf: 'center'
    },
    profileDisplay: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    userAvatar: {
        display: 'flex',
        flex: -1,
        flexDirection: 'column', 
        //justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        cursor: 'pointer'
    },
    menuOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    button: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
        
    },
    btntxt: {
        textAlignVertical: 'center'
    }
});

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(Profile)
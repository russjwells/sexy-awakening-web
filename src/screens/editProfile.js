import React, {Component, useContext, useState} from 'react'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-primitives'

import CircleAvatar from '../components/circleAvatar'
import SquareAvatar from '../components/squareAvatar'
//import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';
import chemistryIcon from '../img/chemistry.svg';
import { ArrowLeft } from 'react-feather';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UserDataContext from '../components/UserDataContext';
import UserDataHelpers from '../utils/UserDataHelpers'
import {db} from '../firebase'

import FileBase64 from 'react-file-base64'
import axios from 'axios'


import ImageUploader from 'react-images-upload'

function EditProfile (props) {
    const {userData, setUserData} = useContext(UserDataContext)
    const [bio, setBio] = useState(userData.bio)
    const {width, height} = Dimensions.get('window')
    const [pictures, setPictures] = useState([])
    const [newPic, setNewPic] = useState(null)

    const onDrop = (picture) => {
        console.log("up", picture)
        setPictures(picture)
        console.log(pictures)
    }

    const updateUser = (key, value) => {
        const {uid} = userData
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    const newpic = async () => {

    }

    const save = (bio) => {
        console.log("save")
        updateUser('bio', bio)
    }

    const txtChange = (event) => {
        //console.log(event.target.value)
        setBio(event.target.value)
    } 
    
    return(
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Link to={routes.LANDING}>
                    <View style={styles.navback}>
                        <Text><ArrowLeft size={36} color="#000" /></Text>
                    </View>
                </Link>
                <View style={styles.navlocation}>
                    <Text style={styles.navtext}>Edit Profile</Text>
                </View>
                <View style={styles.navright}>
                    
                </View>
            </View>
            <View style={styles.content}>
                <SquareAvatar
                    size={(400,400)} 
                    uid={userData.uid} 
                    pic={userData.picture}
                />
                <Text style={{fontSize:20}}>
                    {userData.first_name}
                </Text>
                
                <FileBase64 
                    multiple={true}
                    onDone={newpic}
                />
                <textarea style={{fontSize:15, width:400, minHeight:400, resize:false}} onChange={txtChange}>
                    {bio}
                </textarea>
                <button onClick={save(bio)}>
                    Save Changes
                </button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    content: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100px'
    },
    navback: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '100px',
        width: '100px',
        alignItems: 'center'
    },
    navright: {
        display: 'flex',
        height: '100px',
        width: '100px',
    },
    navlocation: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    navtext: {
        display: 'flex',
        fontSize: '20px',
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'black',
        alignSelf: 'center',
        fontSize: '20px'
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
export default withAuthorization(authCondition)(EditProfile)
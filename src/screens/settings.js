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

import Switch from "react-switch";
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';

const Settings = (props) => {
    //const {width, height} = Dimensions.get('window')
    const {userData, setUserData} = useContext(UserDataContext)
    console.log("dta", userData)
    ///*
    const [showMen, setShowMen] = useState(userData.showMen)
    const [showWomen, setShowWomen] = useState(userData.showWomen)
    const [showNonbinary, setShowNonbinary] = useState(userData.showNonbinary)
    const [showTransmen, setShowTransmen] = useState(userData.showTransmen)
    const [showTranswomen, setShowTranswomen] = useState(userData.showTranswomen)
    const [showGroups, setShowGroups] = useState(userData.showGroups)

    const updateUser = (key, value) => {
        const {uid} = userData
        console.log("update user uid: " + uid)
        //alert("update user uid: " + uid)
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    const handleMen = nextMen => {
        setShowMen(nextMen)
        updateUser('showMen', nextMen)
    }

    //*/
    
    

    return(
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Link to={routes.LANDING}>
                    <View style={styles.navback}>
                        <Text><ArrowLeft size={36} color="#000" /></Text>
                    </View>
                </Link>
                <View style={styles.navlocation}>
                    <Text style={styles.navtext}>Settings</Text>
                </View>
                <View style={styles.navright}>
                    
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>Age</Text>
                </View>
                <View style={styles.label}>
                    <Text>You will only encounter people aged </Text>
                        <Text style={{color: '#e54560'}}>{userData.ageRange[0]}</Text>
                        <Text style={{color: '#e54560'}}> – </Text>
                        <Text style={{color: '#e54560'}}>{userData.ageRange[1]}</Text>
                        <Text> on Sexy Awakening.</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={18}
                            max={144}
                            values={userData.ageRangeValues}
                            //onValuesChange={val => this.setState({ageRangeValues: val})}
                            //onValuesChangeFinish={val => this.updateUser('ageRange', val)}
                            onSlide={val => val}
                            width={'30%'}
                            readOnly={false}
                        >
                            <Progress color="#e5460" height={10} progress={userData.ageRange[0]}>
                                <Dot color="darkgrey"></Dot>
                            </Progress>
                            <Progress color="#e5460" height={10} progress={userData.ageRange[1]}>
                                <Dot color="darkgrey"></Dot>
                            </Progress>
                        </MultiSlider>
                    </View>
                    
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>Where</Text>
                    </View>
                    <View style={styles.label}>
                        <Text>You are swiping near </Text>
                        <Text style={{color: '#e54560'}}>your current locaiton.</Text>
                    </View>
                    <br />
                    <View style={styles.label}>
                        <Text>Finding connections up to </Text>
                        <Text style={{color: '#e54560'}}>{userData.distance} km</Text>
                        <Text> away.</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={1}
                            max={1000}
                            values={userData.distanceValue}
                            readOnly={false}
                            //onValuesChange={val => this.setState({distanceValue: val})}
                            //onValuesChangeFinish={val => this.updateUser('distance', val[0])}
                            onSlide={val => val}
                            width={'30%'}
                        >
                            <Progress color="#e5460" progress={userData.distance}>
                                <Dot color="darkgrey"></Dot>
                            </Progress>
                        </MultiSlider>
                    </View>
                    
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>Who</Text>
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Men</Text>
                        <Switch 
                            checked={showMen}
                            onChange={handleMen}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Women</Text>
                        <Switch 
                            checked={showWomen}
                            onChange={val => {
                                setShowWomen(val)
                                updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Nonbinary</Text>
                        <Switch 
                            checked={showNonbinary}
                            onChange={val => {
                                setShowNonbinary(val)
                                updateUser('showNonbinary', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transmen</Text>
                        <Switch 
                        checked={showTransmen}
                            onChange={val => {
                                setShowTransmen(val)
                                updateUser('showTransmen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transwomen</Text>
                        <Switch 
                        checked={showTranswomen}
                            onChange={val => {
                                setShowTranswomen(val)
                                updateUser('showTranswomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Groups</Text>
                        <Switch 
                        checked={showGroups}
                            onChange={val => {
                                setShowGroups(val)
                                updateUser('showGroups', val)
                            }}
                        />
                    </View>
                
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
        flex:1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    filters:{
        flex: 1,
    },
    sectionTitle: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    sectionTitleText: {
        color: '#e54560',
        padding: 20,
        fontWeight:'bold'
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    slider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        width: '100%',
        marginTop:'20px',
        marginBottom:'20px'
        //backgroundColor: 'green'

    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
});

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(Settings)
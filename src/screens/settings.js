import React, {Component, useContext, useState, useRef} from 'react'
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

const sliderStyle = {
    width: '100%',
    accentColor: '#e54560',
    cursor: 'pointer',
    marginTop: 8,
    marginBottom: 8,
}

const Settings = (props) => {
    const {userData, setUserData} = useContext(UserDataContext)

    const [showMen,       setShowMen]       = useState(userData.showMen)
    const [showWomen,     setShowWomen]     = useState(userData.showWomen)
    const [showNonbinary, setShowNonbinary] = useState(userData.showNonbinary)
    const [showTransmen,  setShowTransmen]  = useState(userData.showTransmen)
    const [showTranswomen,setShowTranswomen]= useState(userData.showTranswomen)
    const [showGroups,    setShowGroups]    = useState(userData.showGroups)

    const toNumArray = (val, fallback) => {
        if (!val) return fallback
        const arr = Array.isArray(val) ? val : Object.values(val)
        const nums = arr.map(Number).filter(n => !isNaN(n))
        return nums.length ? nums : fallback
    }

    const ageRangeInit = toNumArray(userData.ageRange, [18, 60])
    const distanceInit = toNumArray(userData.distance, [200])
    const [ageRange, setAgeRange] = useState(ageRangeInit)
    const [distance, setDistance] = useState(distanceInit)
    const ageRangeRef = useRef(ageRangeInit)
    const distanceRef = useRef(distanceInit)

    const updateUser = (key, value) => {
        const {uid} = userData
        firebase.database().ref('users').child(uid).update({[key]: value})
        setUserData(prev => ({...prev, [key]: value}))
    }

    const saveAgeRange  = () => updateUser('ageRange', ageRangeRef.current)
    const saveDistance  = () => updateUser('distance', distanceRef.current)
    
    

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
                    <Text style={{color: '#e54560'}}>{ageRange[0]}</Text>
                    <Text style={{color: '#e54560'}}> – </Text>
                    <Text style={{color: '#e54560'}}>{ageRange[1]}</Text>
                    <Text> on Sexy Awakening.</Text>
                </View>
                <View style={styles.slider}>
                    <Text style={styles.sliderLabel}>Min: {ageRange[0]}</Text>
                    <input type="range" min={18} max={144}
                        value={ageRange[0]}
                        style={sliderStyle}
                        onChange={e => {
                            const val = Math.min(parseInt(e.target.value), ageRangeRef.current[1] - 1)
                            const next = [val, ageRangeRef.current[1]]
                            ageRangeRef.current = next
                            setAgeRange(next)
                        }}
                        onMouseUp={saveAgeRange}
                        onTouchEnd={saveAgeRange}
                    />
                    <Text style={styles.sliderLabel}>Max: {ageRange[1]}</Text>
                    <input type="range" min={18} max={144}
                        value={ageRange[1]}
                        style={sliderStyle}
                        onChange={e => {
                            const val = Math.max(parseInt(e.target.value), ageRangeRef.current[0] + 1)
                            const next = [ageRangeRef.current[0], val]
                            ageRangeRef.current = next
                            setAgeRange(next)
                        }}
                        onMouseUp={saveAgeRange}
                        onTouchEnd={saveAgeRange}
                    />
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
                        <Text style={{color: '#e54560'}}>{distance[0]} km</Text>
                        <Text> away.</Text>
                    </View>
                    <View style={styles.slider}>
                        <input type="range" min={1} max={1000}
                            value={distance[0]}
                            style={sliderStyle}
                            onChange={e => {
                                const next = [parseInt(e.target.value)]
                                distanceRef.current = next
                                setDistance(next)
                            }}
                            onMouseUp={saveDistance}
                            onTouchEnd={saveDistance}
                        />
                    </View>
                    
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>Who</Text>
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Men</Text>
                        <Switch checked={showMen} onChange={val => { setShowMen(val); updateUser('showMen', val) }} />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Women</Text>
                        <Switch checked={showWomen} onChange={val => { setShowWomen(val); updateUser('showWomen', val) }} />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Nonbinary</Text>
                        <Switch checked={showNonbinary} onChange={val => { setShowNonbinary(val); updateUser('showNonbinary', val) }} />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transmen</Text>
                        <Switch checked={showTransmen} onChange={val => { setShowTransmen(val); updateUser('showTransmen', val) }} />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transwomen</Text>
                        <Switch checked={showTranswomen} onChange={val => { setShowTranswomen(val); updateUser('showTranswomen', val) }} />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Groups</Text>
                        <Switch checked={showGroups} onChange={val => { setShowGroups(val); updateUser('showGroups', val) }} />
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
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
        width: '90%',
    },
    sliderLabel: {
        fontSize: '13px',
        color: 'darkgrey',
        marginTop: 4,
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
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
import MultiSlider, { Progress } from 'react-multi-bar-slider';

function Settings (props) {
    const {width, height} = Dimensions.get('window')
    const {userData, setUserData} = useContext(UserDataContext)
    const {showMen, setShowMen} = useState(userData.showMen)
    const {showWomen} = useState(userData.showWomen)
    const {showNonbinary} = useState(userData.showNonbinary)
    const {showTransmen} = useState(userData.showTransmen)
    const {showTranswomen} = useState(userData.showTranswomen)
    const {showGroups} = useState(userData.showGroups)
    
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
                        <Text style={styles.sectionTitleText}>Where</Text>
                    </View>
                    <View style={styles.label}>
                        <Text>Distance</Text>
                        <Text style={{color: 'darkgrey'}}>{userData.distanceValue} km</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={1}
                            max={200}
                            values={userData.distanceValue}
                            onValuesChange={val => this.setState({distanceValue: val})}
                            onValuesChangeFinish={val => this.updateUser('distance', val[0])}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text>Location</Text>
                        <Text style={{color: 'darkgrey'}}>{userData.distanceValue} km from here.</Text>
                    </View>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>Who</Text>
                    </View>
                    <View style={styles.label}>
                        <Text>Age Range</Text>
                        <Text style={{color: 'darkgrey'}}>{userData.ageRangeValues}</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={18}
                            max={144}
                            values={userData.ageRangeValues}
                            onValuesChange={val => this.setState({ageRangeValues: val})}
                            onValuesChangeFinish={val => this.updateUser('ageRange', val)}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Men</Text>
                        <Switch 
                            value={showMen}
                            onValueChange={val => {
                                this.setState({showMen:val})
                                this.updateUser('showMen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Women</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Nonbinary</Text>
                        <Switch 
                            value={showNonbinary}
                            onValueChange={val => {
                                this.setState({showNonbinary:val})
                                this.updateUser('showNonbinary', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transmen</Text>
                        <Switch 
                            value={showTransmen}
                            onValueChange={val => {
                                this.setState({showTransmen:val})
                                this.updateUser('showTransmen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Transwomen</Text>
                        <Switch 
                            value={showTranswomen}
                            onValueChange={val => {
                                this.setState({showTranswomen:val})
                                this.updateUser('showTranswomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Groups</Text>
                        <Switch 
                            value={showGroups}
                            onValueChange={val => {
                                this.setState({showGroups:val})
                                this.updateUser('showGroups', val)
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    slider: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
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
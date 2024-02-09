import React, {Component, useContext, useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-primitives'
import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'
import Card from '../components/card'
import { usePosition } from 'use-position'
import * as firebase from 'firebase'
import GeoFire from 'geofire'
import _ from 'lodash'
import filter from '../modules/filter'

import UserDataContext from '../components/UserDataContext';

function Swipes (props) {

    const {userData} = useContext(UserDataContext)
    
    const [profiles, setProfiles] = useState([])
    const [profileIndex, setProfileindex] = useState([])
    //const [user, setUser] = useState(userData)
    const {latitude, longitude, error} = usePosition()
    //console.log("position: "+latitude+", "+longitude + ", " + error)

    useEffect(()=>{
        (async()=>{
            //const {uid} = userData
            //console.log("swipes user: " + uid)
            //updateUserLocation(latitude, longitude)
            
        if (latitude!=null) {
            const {uid} = userData
            updateUserLocation(uid)
            firebase.database().ref('users').child(uid).on('value', snap => {
                const user = snap.val()
                /*
                this.setState({
                user,
                profiles:[],
                profileIndex:0,
                })
                */
                //setUser(user)
                setProfiles([])
                setProfileindex(0)
                console.log("profiles query: " + user.uid + "," + user.distance)
                
                //getProfiles(user.uid, user.distance)
                console.log("profiles query: " + userData.uid + "," + userData.distance)
                getProfiles(userData.uid, userData.distance)
                //console.log('profile: '+profiles)
                
            })
        } else {
        //    alert(profiles)
        }
        })()
        return ()=>{
                
        }
    }, [latitude])

    const updateUserLocation = async (uid) =>{
        const status = 'granted'
            if (status === 'granted') {
            //const location = await Location.getCurrentPositionAsync({enableHighAccuracy: false})
            // const {latitude, longitude} = location.coords
            const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
            geoFireRef.set(uid, [latitude, longitude])
            console.log("location updated")
            //console.log('Location: ', location)
            } else {
            console.log('Permission Denied')
            }
    }

    const getUser = (uid) => {
        return firebase.database().ref('users').child(uid).once('value')
      }

    const getSwipedSex = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('sex')
        .once('value')
        .then(snap => snap.val() || {})
    }
    const getSwipedRomance = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('romance')
        .once('value')
        .then(snap => snap.val() || {})
    }
    const getSwipedFriendship = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('friendship')
        .once('value')
        .then(snap => snap.val() || {})
    }
    const getSwipedPass = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('pass')
        .once('value')
        .then(snap => snap.val() || {})
    }

    const getProfiles = async (uid, distance) => {
        console.log("getProfiles")
        const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
        const userLocation = await geoFireRef.get(uid)
        //console.log('userLocation', userLocation)
        const swipedSex = await getSwipedSex(uid)
        //console.log("swipedSex:", swipedSex)
        const swipedRomance = await getSwipedRomance(uid)
        //console.log("swipedRomance:", swipedRomance)
        const swipedFriendship = await getSwipedFriendship(uid)
        //console.log("swipedFriendship:", swipedFriendship)
        const swipedPass = await getSwipedPass(uid)
        //console.log("swipedPass:", swipedPass)
        const swipedProfiles = _.merge(swipedSex, swipedRomance, swipedFriendship, swipedPass)
        //console.log("swipedProfiles:", swipedProfiles)
        const geoQuery = geoFireRef.query({
            center: userLocation,
            radius: distance, //km
        })
        const arrayofpeople = geoQuery.on('key_entered', async (uid, location, distance) => {
            console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
            const user = await getUser(uid)
            //console.log('querying for ' + user.val().first_name)
            console.log("query of: ", profiles)
            console.log(profiles.length)
            const lprofiles = [...profiles, user.val()]
            //console.log('qprofiles', lprofiles)
            const filtered = filter(lprofiles, userData, swipedProfiles)
            if (filtered.length>0){
                setProfiles(filtered)
                console.log('profiles set')
            } 
            //setProfiles(filtered)
            console.log("filtered:")
            console.log(filtered)
            //console.log("profiles", profiles)
            //this.setState({profiles: profiles})
            return filtered
        })
        //alert(arrayofpeople.values())
        setProfiles(...arrayofpeople)
    }
    const cardStack = () => {
        //console.log("position: "+latitude+", "+longitude + ", " + "error: " + error)
        return(
            <View style={{flex: 1}}>
                {//profiles.slice(profileIndex, profileIndex + 1).reverse().map((profile, i) => {
                    //return(
                        <Card 
                            //key = {profile.id}
                            //profile = {profile}
                            onSwipeOff ={nextCard}
                            //i = {i}
                        />
                    //)
                //})
                }
                
            </View>
        )
    }

    const nextCard = (swipedDirection, profileUid) => {
        const userUid = userData.uid
        setProfileindex(profileIndex + 1)
        if (swipedDirection === 'right'){
          console.log("hooray sex")
        }
        if (swipedDirection === 'up'){
          console.log("hooray romance")
        }
        if (swipedDirection === 'left'){
          console.log("hooray friendship")
        }
        if (swipedDirection === 'down'){
          console.log("passsssss")
        }
        relate(userUid, profileUid, swipedDirection)
        //stack hack
        const {uid} = userData
        updateUserLocation(uid)
        firebase.database().ref('users').child(uid).on('value', snap => {
          const user = snap.val()
          //setUser(user)
          setProfiles([])
          setProfileindex(0)
          getProfiles(user.uid, user.distance)
        })
        //end stack hack
      }

      const relate = (userUid, profileUid, swipedDirection) => {
        let relationUpdate = {}
        let relation = ""
        if (swipedDirection === 'right'){
          relation = 'sex'
        }
        if (swipedDirection === 'up'){
          relation = 'romance'
        }
        if (swipedDirection === 'left'){
          relation = 'friendship'
        }
        if (swipedDirection === 'down'){
          relation = 'pass'
        }
        relationUpdate[`${userUid}/${relation}/${profileUid}`] = true
        relationUpdate[`${profileUid}/${relation}Back/${userUid}`] = true
    
        firebase.database().ref('relationships').update(relationUpdate)
      }
    /*
    const {uid} = userData
    if (latitude != null) {
        updateUserLocation(uid)
        firebase.database().ref('users').child(uid).on('value', snap => {
            const user = snap.val()
            
            //this.setState({
            //  user,
            //  profiles:[],
            //  profileIndex:0,
            //})
            
            //setUser(user)
            //setProfiles([])
            //setProfileindex(0)
            getProfiles(user.uid, user.distance)
          })
    } */

    return(
        <View style={styles.swipes}>
            <View>
                <Image source={romanceSymbol} style={{width:30, height:30}} />
            </View>
            <View style={styles.swipesMiddle}>
                <View>
                    <Image source={friendshipSymbol} style={{width:30, height:30}} />
                </View>
                <View>
                    {cardStack()}
                </View>
                <View>
                    <Image source={sexSymbol} style={{width:60, height:60}} />
                </View>
            </View>
            <View><Image source={passSymbol} style={{width:30, height:30}} /></View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    swipes: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white',
      marginBottom: '20px'
    },
    swipesMiddle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '20px',
        //marginRight: '20px',
        //marginLeft: '20px'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
    }
});


export default Swipes;
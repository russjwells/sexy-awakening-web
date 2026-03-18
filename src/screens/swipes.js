import React, {Component, useContext, useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Image} from 'react-primitives'
import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'
import sexSymbolRed from '../img/sex_red.png'
import romanceSymbolRed from '../img/romance_red.png'
import friendshipSymbolRed from '../img/friendship_red.png'
import passSymbolRed from '../img/pass_red.png'
import Card from '../components/card'
import { usePosition } from 'use-position'
import * as firebase from 'firebase'
import GeoFire from 'geofire'
import _ from 'lodash'
import filter from '../modules/filter'

import UserDataContext from '../components/UserDataContext';

const demoProfiles = [
    { uid: 'demo1', first_name: 'Aria',    picture: 'new', bio: 'Adventure seeker' },
    { uid: 'demo2', first_name: 'Luna',    picture: 'new', bio: 'Coffee & good vibes' },
    { uid: 'demo3', first_name: 'Sage',    picture: 'new', bio: 'Free spirit' },
    { uid: 'demo4', first_name: 'River',   picture: 'new', bio: 'Outdoors enthusiast' },
    { uid: 'demo5', first_name: 'Phoenix', picture: 'new', bio: 'Creative soul' },
]

function Swipes (props) {

    const {userData} = useContext(UserDataContext)
    
    const [profiles, setProfiles] = useState([])
    const profilesRef = useRef([])
    const [profileIndex, setProfileindex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [locationName, setLocationName] = useState(null)
    const [nearbyCount, setNearbyCount] = useState(0)
    const [activeDirection, setActiveDirection] = useState(null)
    const cardRef = useRef(null)
    const userDataRef = useRef(userData)
    const getProfilesRef = useRef(null)
    useEffect(() => { userDataRef.current = userData })

    const iconSwipe = (direction) => {
        if (cardRef.current) cardRef.current.swipe(direction)
    }

    useEffect(() => {
        const keyMap = {
            ArrowRight: 'right',
            ArrowLeft:  'left',
            ArrowUp:    'up',
            ArrowDown:  'down',
        }
        const onKeyDown = (e) => {
            const dir = keyMap[e.key]
            if (dir) {
                e.preventDefault()
                iconSwipe(dir)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])
    //const [user, setUser] = useState(userData)
    const {latitude, longitude, error} = usePosition()
    //console.log("position: "+latitude+", "+longitude + ", " + error)

    useEffect(() => {
        if (typeof latitude !== 'number' || typeof longitude !== 'number') return
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(r => r.json())
            .then(data => {
                const a = data.address
                const name = a.city || a.town || a.village || a.county || a.state
                setLocationName(name || null)
            })
            .catch(() => {})
    }, [latitude, longitude])

    useEffect(()=>{
        (async()=>{
            //const {uid} = userData
            //console.log("swipes user: " + uid)
            //updateUserLocation(latitude, longitude)
            
        if (latitude != null && userData.uid !== 'new') {
            const {uid} = userData
            updateUserLocation(uid)
            firebase.database().ref('users').child(uid).on('value', snap => {
                const user = snap.val()
                if (!user) return
                setProfiles([])
                setProfileindex(0)
                getProfiles(user.uid, user.distance)
            })
        }
        })()
        return ()=>{}
    }, [latitude, userData.uid])

    const updateUserLocation = async (uid) =>{
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            console.log('location not ready yet')
            return
        }
        const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
        geoFireRef.set(uid, [latitude, longitude])
        console.log("location updated")
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
        setLoading(true)
        const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
        const userLocation = await geoFireRef.get(uid)
        if (userLocation == null) {
            console.log("no location saved for user yet")
            setLoading(false)
            return
        }
        const swipedSex = await getSwipedSex(uid)
        const swipedRomance = await getSwipedRomance(uid)
        const swipedFriendship = await getSwipedFriendship(uid)
        const swipedPass = await getSwipedPass(uid)
        const swipedProfiles = _.merge(swipedSex, swipedRomance, swipedFriendship, swipedPass)
        const radius = Array.isArray(distance) ? distance[0] : distance
        const geoQuery = geoFireRef.query({
            center: userLocation,
            radius: radius,
        })
        profilesRef.current = []
        setNearbyCount(0)
        geoQuery.on('key_entered', async (uid, location, distance) => {
            setNearbyCount(c => c + 1)
            const user = await getUser(uid)
            if (!user.val()) return
            const lprofiles = [...profilesRef.current, user.val()]
            const filtered = filter(lprofiles, userData, swipedProfiles)
            if (filtered.length > 0) {
                profilesRef.current = filtered
                setProfiles(filtered)
            }
        })
        geoQuery.on('ready', () => setLoading(false))
    }
    getProfilesRef.current = getProfiles

    useEffect(() => {
        const onRefresh = () => {
            const ud = userDataRef.current
            if (!ud || ud.uid === 'new') return
            setProfiles([])
            setProfileindex(0)
            getProfilesRef.current(ud.uid, ud.distance)
        }
        window.addEventListener('refreshSwipes', onRefresh)
        return () => window.removeEventListener('refreshSwipes', onRefresh)
    }, [])

    const cardStack = () => {
        if (loading) {
            return <View style={styles.emptyCard}><Text style={styles.emptyText}>Loading...</Text></View>
        }
        const stack = profiles.length > 0 ? profiles : demoProfiles
        const current = stack.slice(profileIndex, profileIndex + 1)
        return(
            <View style={{flex: 1}}>
                {current.map((profile, i) => (
                    <Card
                        key={profile.uid}
                        ref={cardRef}
                        profile={profile}
                        onSwipeOff={nextCard}
                        onDragDirection={setActiveDirection}
                        i={i}
                    />
                ))}
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
          if (!user) return
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
            <View onClick={() => iconSwipe('up')} style={styles.iconBtn}>
                <Image source={activeDirection === 'up' ? romanceSymbolRed : romanceSymbol} style={{width:30, height:30}} />
            </View>
            <View style={styles.swipesMiddle}>
                <View onClick={() => iconSwipe('left')} style={styles.iconBtn}>
                    <Image source={activeDirection === 'left' ? friendshipSymbolRed : friendshipSymbol} style={{width:30, height:30}} />
                </View>
                <View>
                    {cardStack()}
                </View>
                <View onClick={() => iconSwipe('right')} style={styles.iconBtn}>
                    <Image source={activeDirection === 'right' ? sexSymbolRed : sexSymbol} style={{width:60, height:60}} />
                </View>
            </View>
            {locationName && (
                <Text style={styles.locationText}>
                    {nearbyCount} {nearbyCount === 1 ? 'person' : 'people'} near {locationName}
                </Text>
            )}
            <View onClick={() => iconSwipe('down')} style={styles.iconBtn}>
                <Image source={activeDirection === 'down' ? passSymbolRed : passSymbol} style={{width:30, height:30}} />
            </View>
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
    },
    emptyCard: {
        width: '300px',
        height: '300px',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'darkgrey',
        fontSize: '16px',
    },
    iconBtn: {
        cursor: 'pointer',
        padding: '10px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText: {
        fontSize: '13px',
        color: 'darkgrey',
        textAlign: 'center',
    }
});


export default Swipes;
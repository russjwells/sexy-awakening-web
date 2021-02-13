import React, {Component, useState, useEffect, useContext}  from 'react'
import {View, Text, StyleSheet, Image} from 'react-primitives'
import { Link } from 'react-router-dom';
import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'
import CircleAvatar from '../components/circleAvatar'

import sexSymbolRed from '../img/sex_red.png'
import romanceSymbolRed from '../img/romance_red.png'
import friendshipSymbolRed from '../img/friendship_red.png'
import passSymbolRed from '../img/pass_red.png'
import * as routes from '../constants/routes';

import * as firebase from 'firebase'
import _ from 'lodash'

import UserDataContext from '../components/UserDataContext';


import ReactList from 'react-list'

function Matches (props) {

    const demoProfiles = [
    {
        id: '259389830744794',
        first_name: 'Candice',
        birthday: '10/18/1986',
        work: [{position:{name:'Supermodel'}}],
    },
    {
        id: '720115413',
        first_name: 'Alessandra',
        birthday: '1/10/1989',
        work: [{position:{name:'Dancer'}}],
    },
    {
        id: '912478262117011',
        first_name: 'Rosie',
        birthday: '9/4/1989',
        work: [{position:{name:'Artist'}}],
    },
    {
        id: '1476279359358140',
        first_name: 'Alissa',
        birthday: '2/11/1990',
        work: [{position:{name:'Comedian'}}],
    },
    {
        id: '173567062703796',
        first_name: 'Kendall',
        birthday: '8/17/1992',
        work: [{position:{name:'Truck Driver'}}],
    },
    {
        id: '169571172540',
        first_name: 'Miranda',
        birthday: '12/12/1983',
        work: [{position:{name:'Doctor'}}],
    },
    {
        id: '1492309647685574',
        first_name: 'Behati',
        birthday: '3/23/1991',
        work: [{position:{name:'Developer'}}],
    },
    {
        id: '662254353934918',
        first_name: 'Anna',
        birthday: '3/23/1989',
        work: [{position:{name:'Personal Trainer'}}],
    },
    {
        id: '424154277777372',
        first_name: 'Gabriella',
        birthday: '3/23/1988',
        work: [{position:{name:'Surfer'}}],
    },
    {
        id: '662720103796952',
        first_name: 'Mara',
        birthday: '3/23/1987',
        work: [{position:{name:'Lifeguard'}}],
    },
    ]
    const accounts = useState(demoProfiles)

    const [matchType, setMatchType] = useState('sex')
    const [matches, setMatches] = useState([])
    const [sex, setSex] = useState([])
    const [romance, setRomance] = useState([])
    const [friendship, setFriendship] = useState([])
    const [pass, setPass] = useState([])

    const {userData} = useContext(UserDataContext)
    //useEffect()

    //run did mount
    useEffect(() => {
        (async () => {
          
              getMatches(userData.uid)
            
        })()
      }, [userData.uid])
    
    
    const getMatches = (uid) => {
        firebase.database().ref('relationships').child(uid).on('value', snap => {
            const relations = snap.val()
            if (relations == null) {
                console.log('user must be new')
            } else {
                console.log('relaish', relations)

                //*
                //const allMatches = this.getOverlap(relations.liked, relations.likedBack)
                const allSex = getOverlap(relations.sex, relations.sexBack)
                const allRomance = getOverlap(relations.romance, relations.romanceBack)
                const allFriendship = getOverlap(relations.friendship, relations.friendshipBack)

                //sex data
                const promisesSex = allSex.map(profileUid => {
                    const foundProfile = _.find(matches, profile => profile.uid === profileUid)
                    return foundProfile ? foundProfile : getUser(profileUid)
                })
                Promise.all(promisesSex).then(data => setSex(data))

                //romance data
                const promisesRomance = allRomance.map(profileUid => {
                    const foundProfile = _.find(matches, profile => profile.uid === profileUid)
                    return foundProfile ? foundProfile : getUser(profileUid)
                })
                Promise.all(promisesRomance).then(data => setRomance(data))

                //friendship data
                const promisesFriendship = allFriendship.map(profileUid => {
                    const foundProfile = _.find(matches, profile => profile.uid === profileUid)
                    return foundProfile ? foundProfile : getUser(profileUid)
                })
                Promise.all(promisesFriendship).then(data => setFriendship(data))

                const allMatches = allSex.concat(allRomance.concat(allFriendship))
                const promises = allMatches.map(profileUid => {
                    const foundProfile = _.find(matches, profile => profile.uid === profileUid)
                    return foundProfile ? foundProfile : getUser(profileUid)
                })
                Promise.all(promises).then(data => setMatches(data))
                //*/
            }
        })
    }

    const getUser = (uid) => {
        return firebase.database().ref('users').child(uid).once('value')
            .then(snap => snap.val())
    }

    const getOverlap = (liked, likedBack) => {
        const likedTrue = _.pickBy(liked, value => value)
        const likedBackTrue = _.pickBy(likedBack, value => value)
        //console.log(likedTrue, likedBackTrue)
        return _.intersection(_.keys(likedTrue), _.keys(likedBackTrue))
    }

    const filterList = (type) => {
        setMatchType(type)
    }
    const renderItem = (index, key) => {
        const {uid, picture, first_name} = accounts[index]
        //const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        //const bio = item.bio ? item.bio : null
        const matchType = "unsure"

        return (
            <Link to={routes.YOURPROFILE}
                //onPress={() => this.props.navigation.navigate('Chat', {user: this.props.user, profile: item})}
            >
                <View style={{flexDirection:'row', backgroundColor:'white', padding:10}} >
                    <Link to={routes.YOURPROFILE}
                        //onPress={() => this.props.navigation.navigate('ViewProfile', {user: this.props.user, profile: item})}
                    >
                        <CircleAvatar uid={uid} pic={picture} size={(80, 80)} />
                    </Link>
                    <View style={{justifyContent:'center', marginLeft:10}}>
                        <Text style={{fontSize:18}}>
                            {/*first_name*/}
                        </Text>
                        <Text style={{fontSize:15, color:'darkgrey'}}>
                            {/*bio*/}
                        </Text>
                    </View>
                </View>
            </Link>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.list}>
                <ReactList
                    itemRenderer={renderItem}
                    length={matches.length}
                    type='uniform'
                    //key={r}
                />
                <Text>{matchType}</Text>
            </View>
            <View style={styles.relationshipFilter}>
                <View style={styles.filterButton} 
                    onClick={() => {setMatchType('sex')}}
                >
                    <View style={[styles.filterButton, styles.sexFilter]}>
                        <Image source={matchType === 'sex' ? sexSymbolRed : sexSymbol} style={{width:70, height:70}} />
                    </View>
                </View>
                <View style={styles.filterButton} 
                    onClick={()=>{setMatchType('romance')}}
                >
                    <View style={styles.filterButton}>
                        <Image source={matchType === 'romance' ? romanceSymbolRed : romanceSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
                <View style={styles.filterButton} 
                    onClick={() => {setMatchType('friendship')}}
                >
                    <View style={styles.filterButton}>
                        <Image source={matchType === 'friendship' ? friendshipSymbolRed : friendshipSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
                <View style={styles.filterButton} 
                    onClick={() => {setMatchType('pass')}}
                >
                    <View style={styles.filterButton}>
                        <Image source={matchType === 'pass' ? passSymbolRed : passSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
            </View>
        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    relationtypefilter:{
        flex: -1,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    relationshipFilter:{
        flex:-1,
        flexDirection:'row',
    },
    filterButton:{
        flex:1,
        height:60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        pointer:'pointer',
    },
    sexFilter:{
        flex:1,
    },
    selectedFilter:{
        backgroundColor: 'red',
    },
    menuOption: {
        flex: 1,
    },
    chats: {
        flex: 9,
    },
    list: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,

    }
})




export default Matches;


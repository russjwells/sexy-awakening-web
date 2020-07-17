import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NavBar from '../components/navBar';
import Footer from '../components/footer'
import WebScroller from '../components/webScroller'
import Drawer from 'react-motion-drawer';
import Menu from '../components/menu'
import Profile from './profile'
import Swipes from './swipes'
import Matches from './matches'
import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';

//import filter from '../modules/filter'

import _ from 'lodash'
import * as firebase from 'firebase'
import GeoFire from 'geofire'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          profileIndex: 0,
          profiles: [],
          drawer: false,
          activeScreen: "profile",
          authUser: this.props.authUser,
          userData: null,
      }
      console.log('home constructor state defaults')
    }

    toggleDrawer = () => {
      const bool = this.state.drawer ? false : true
      this.setState({drawer:bool})
      console.log('drawer toggle:', this.state.drawer)
    }
    drawerChanged = () => {
        //const bool = !this.state.drawer
        //this.setState({drawer:bool})
        console.log('drawerChanged')
    }
    drawerChange = (isOpen) => {
        console.log('drawer changed: its '+isOpen)
        //if (isOpen==false) {
        //this.setState({drawer:isOpen})
        //}
        //console.log('drawer changed, now:', this.state.drawer)
        //alert(isOpen)
        //console.log('drawer change', isOpen)
    }  
    menuPress = () => {
        console.log('menu pressed home')
        this.setState({activeScreen:"menu"})
    }
    profilePress = () => {
        console.log('profile pressed home')
        this.setState({activeScreen:"profile"})
    }
    swipesPress = () => {
        console.log('swipes pressed home')
        this.setState({activeScreen:"swipes"})
    }
    matchesPress = () => {
        console.log('matches pressed home')
        this.setState({activeScreen:"matches"})
    }
      
    componentWillMount() {
        let authUser = this.context
        const uid = authUser.uid
        //alert('current uid: ' + uid)
        console.log('auth uid: ' + uid)
        //this.setState(cuid, uid)
        //SUCCESSFUL UID
        // THIS WILL BE USEFUL AGAIN SOON
        //this.updateUserLocation(uid)
        firebase.database().ref('users').child(uid).on('value', snap => {
          const user = snap.val()
          this.setState({
            userData: user,
            profiles: [],
            profileIndex: 0,
          }, ()=>{
            console.log("user data present in state:")
            console.log(this.state.userData)
          })
          //this.getProfiles(user.uid, user.distance)
          console.log('home mounted')

        })
    }
    componentDidMount() {

    }
    /*
    static getDerivedStateFromProps(props, state) {
        return {
            user: props.user
        }
    }
    */
    /*
      getSwiped = (uid) => {
        
        const swipedSex = firebase.database().ref('relationships').child(uid).child('sex').once('value').then(snap => snap.val())
        const swipedRomance = firebase.database().ref('relationships').child(uid).child('romance').once('value').then(snap => snap.val())
        const swipedFriendship = firebase.database().ref('relationships').child(uid).child('friendship').once('value').then(snap => snap.val())
        const swipedPass = firebase.database().ref('relationships').child(uid).child('pass').once('value').then(snap => snap.val())
        console.log('swiped sex', {swipedSex})
        const allSwiped = [...swipedSex, ...swipedRomance, ...swipedFriendship, ...swipedPass]
        console.log('all swiped', allSwiped)
        return allSwiped || {}
      }
    
      getSwipedSex = (uid) => {
        return firebase.database().ref('relationships').child(uid).child('sex')
          .once('value')
          .then(snap => snap.val() || {})
      }
      getSwipedRomance = (uid) => {
        return firebase.database().ref('relationships').child(uid).child('romance')
          .once('value')
          .then(snap => snap.val() || {})
      }
      getSwipedFriendship = (uid) => {
        return firebase.database().ref('relationships').child(uid).child('friendship')
          .once('value')
          .then(snap => snap.val() || {})
      }
      getSwipedPass = (uid) => {
        return firebase.database().ref('relationships').child(uid).child('pass')
          .once('value')
          .then(snap => snap.val() || {})
      }

      getProfiles = async (uid, distance) => {
        const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
        const userLocation = await geoFireRef.get(uid)
        //console.log('userLocation', userLocation)
        const swipedSex = await this.getSwipedSex(uid)
        const swipedRomance = await this.getSwipedRomance(uid)
        const swipedFriendship = await this.getSwipedFriendship(uid)
        const swipedPass = await this.getSwipedPass(uid)
        const swipedProfiles = _.merge(swipedSex, swipedRomance, swipedFriendship, swipedPass)
        
        const geoQuery = geoFireRef.query({
          center: userLocation,
          radius: distance, //km
        })
        geoQuery.on('key_entered', async (uid, location, distance) => {
          //console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
          const user = await this.getUser(uid)
          //console.log('querying for ' + user.val().first_name)
          const profiles = [...this.state.profiles, user.val()]
          //console.log('profiles', profiles)
          const filtered = filter(profiles, this.state.user, swipedProfiles)
          this.setState({profiles: filtered})
          //this.setState({profiles: profiles})
        })
      }
      */
     /*

      updateUserLocation = async (uid) => {
    
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({enableHighAccuracy: false})
          const {latitude, longitude} = location.coords
          const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
          geoFireRef.set(uid, [latitude, longitude])
          console.log('Location: ', location)
        } else {
          console.log('Permission Denied')
        }
    
        
        //demo coords
        //  const latitude = 37.39239
        //  const longitude = -122.09072
        //  const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
        //  geoFireRef.set(uid, [latitude, longitude])
        //  console.log('temp coordinates')
        
        
    
      }
*/
    
    render(){
        const userData = this.state.userData
        return (
                <div className={css(styles.container)}>
                    <Drawer 
                        //open={}
                        zIndex={10000}
                        //onChange={this.drawerChanged(this.state.drawer)}
                    >
                        <Menu 
                          userData={userData}
                        />
                    </Drawer>
                    <NavBar 
                        menuPress={this.menuPress}
                        profilePress={this.profilePress}
                        swipesPress={this.swipesPress}
                        matchesPress={this.matchesPress}

                        userData={userData}
                    />
                    <WebScroller 
                        screens={[
                            <Profile 
                                userData={userData}
                            />,
                            <Swipes 
                                userData={userData}
                            />,
                            <Matches 
                                userData={userData}
                            />,
                        ]}
                        screen={this.state.activeScreen}
                    />
                    <Footer />
                </div>
        )
    }
}
Home.contextType = AuthUserContext
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      flexDirection:'column',
    },
  });
  
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Home);
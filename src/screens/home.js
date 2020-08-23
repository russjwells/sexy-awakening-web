import React, { Component, useState, useContext, useEffect } from 'react';
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
import UserDataContext from '../components/UserDataContext';
import {db} from '../firebase'

//import filter from '../modules/filter'

//import _ from 'lodash'
//import * as firebase from 'firebase'
//import GeoFire from 'geofire'

function Home (props) {
    const {user, setUser} = useContext(UserDataContext)
    /*
    async () => {
      const snap = await db.onceGetUserData(props.authUser.uid)
      const usr = snap.val()
      setUser(usr)
    }
    */
    //() => getUserData(props.authUser.uid).then(data=>setUser(data))
    //setUser(userData)
    //const UserData = UserDataContext
    const [profileIndex, setProfileIndex] = useState(0)
    const [profiles, setProfiles] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [activeScreen, setActiveScreen] = useState("profile")
    const [authUser, setAuthUser] = useState(props.authUser)
    //const [userData, setUserData] = useState(UserData)
    

    const toggleDrawer = () => {
      const bool = {drawer} ? false : true
      //this.setState({drawer:bool})
      setDrawer(bool)
      console.log('drawer toggle:', {drawer})
    }
    const drawerChanged = () => {
        //const bool = !this.state.drawer
        //this.setState({drawer:bool})
        console.log('drawerChanged')
    }
    const drawerChange = (isOpen) => {
        console.log('drawer changed: its '+isOpen)
        //if (isOpen==false) {
        //this.setState({drawer:isOpen})
        //}
        //console.log('drawer changed, now:', this.state.drawer)
        //alert(isOpen)
        //console.log('drawer change', isOpen)
    }  
    const menuPress = () => {
        console.log('menu pressed home')
        //this.setState({activeScreen:"menu"})
        setActiveScreen("profile")
    }
    const profilePress = () => {
        console.log('profile pressed home')
        //this.setState({activeScreen:"profile"})
        setActiveScreen("profile")
    }
    const swipesPress = () => {
        console.log('swipes pressed home')
        //this.setState({activeScreen:"swipes"})
        setActiveScreen("swipes")
    }
    const matchesPress = () => {
        console.log('matches pressed home')
        //this.setState({activeScreen:"matches"})
        setActiveScreen("matches")
    }

    const getUserData = async (uid) => {
      const snap = await db.onceGetUserData(uid)
      const user = snap.val()
      //console.log("getUserData()")
      //console.log(user)
      return user
    }

    //run did mount
    useEffect(() => {
      //console.log("useEffect")
      //getUserData(props.authUser.uid).then((data)=>{
      //setUser(data)
      //})
    }, [props.authUser.uid, setUser])

    /*  
    componentWillMount() {
        //get and set userData
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
        })
    }
    */
   /*
    componentDidMount() {
      //get and set userData
      
      let authUser = this.context
      const uid = authUser.uid
      firebase.database().ref('users').child(uid).on('value', snap => {
        const user = snap.val()
        this.setState({
          userData: user,
          profiles: [],
          profileIndex: 0,
        }, ()=>{
          console.log("data for "+this.state.userData.first_name + " is set in state")
          console.log(this.state.userData)
        })
      })
      
    }
    */
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
    
    
    return (
        <AuthUserContext.Consumer>
          {authUser => (
            <UserDataContext.Consumer>
              {userData => (
                <div className={css(styles.container)}>
                  <Drawer 
                      //open={}
                      zIndex={10000}
                      //onChange={this.drawerChanged(this.state.drawer)}
                      authUser={authUser}
                      userData={userData}
                  >
                      <Menu 
                        authUser={authUser}
                        userData={userData}
                      />
                  </Drawer>
                  <NavBar 
                      menuPress={menuPress}
                      profilePress={profilePress}
                      swipesPress={swipesPress}
                      matchesPress={matchesPress}

                      authUser={authUser}
                      userData={userData}
                  />
                  <WebScroller 
                      screens={[
                          <Profile 
                              authUser={authUser}
                              userData={userData}
                          />,
                          <Swipes 
                              authUser={authUser}
                              userData={userData}
                          />,
                          <Matches 
                              authUser={authUser}
                              userData={userData}
                          />,
                      ]}
                      screen={activeScreen}
                  />
                  <Footer />
              </div>
              )}
            </UserDataContext.Consumer>
          )}
        </AuthUserContext.Consumer>
    )
    
}
//Home.contextType = AuthUserContext
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
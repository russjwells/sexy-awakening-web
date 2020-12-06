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
import { onceGetUserData } from '../firebase/db';

function Home (props) {
    const {userData, setUserData} = useContext(UserDataContext)
    //const [user, setUser] = useState(userData)
    
    const [profileIndex, setProfileIndex] = useState(0)
    const [profiles, setProfiles] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [activeScreen, setActiveScreen] = useState("profile")
    const [authUser, setAuthUser] = useState(props.authUser)
    //const [userData, setUserData] = useState(UserData)
    console.log("home auth: " + props.authUser.uid)
    

    const toggleDrawer = () => {
      const bool = {drawer} ? false : true
      setDrawer(bool)
      console.log('drawer toggle:', {drawer})
    }
    const drawerChanged = () => {
        //const bool = !this.state.drawer
        console.log('drawerChanged')
    }
    const drawerChange = (isOpen) => {
        console.log('drawer changed: its '+isOpen)
    }  
    const menuPress = () => {
        console.log('menu pressed home')
        setActiveScreen("profile")
    }
    const profilePress = () => {
        console.log('profile pressed home')
        setActiveScreen("profile")
    }
    const swipesPress = () => {
        console.log('swipes pressed home')
        setActiveScreen("swipes")
    }
    const matchesPress = () => {
        console.log('matches pressed home')
        setActiveScreen("matches")
    }

    const getUserData = async (uid) => {
        const snap = await db.onceGetUserData(uid).then((snap) => {
          const data = snap.val()
          //console.log(data)
          //setUser(data)
          //setUserData(data)
          //return data
        })
    }
    
    //run did mount
    useEffect(() => {
      (async () => {
        if (props.authUser.uid != null){
          const snap = await db.onceGetUserData(props.authUser.uid)
          const data = snap.val()
          //console.log("settinf data:" + data)
          //setUser(data)
          setUserData(data)
        } else {
          alert ("no")
        }
        })//()
      
      console.log("use effect: " + props.authUser.uid)
      //getUserData(props.authUser.uid)
      
      }, [props.authUser.uid]
    )
    
    return (
        <AuthUserContext.Consumer>
          {authUser => (
                <div className={css(styles.container)}>
                  <Drawer 
                      //open={}
                      zIndex={10000}
                      //onChange={this.drawerChanged(this.state.drawer)}
                      authUser={authUser}
                  >
                      <Menu 
                        authUser={authUser}
                      />
                  </Drawer>
                  <NavBar 
                      menuPress={menuPress}
                      profilePress={profilePress}
                      swipesPress={swipesPress}
                      matchesPress={matchesPress}

                      authUser={authUser}
                  />
                  <WebScroller 
                      screens={[
                          <Profile 
                              authUser={authUser}
                          />,
                          <Swipes 
                              authUser={authUser}
                          />,
                          <Matches 
                              authUser={authUser}
                          />,
                      ]}
                      screen={activeScreen}
                  />
                  <Footer />
              </div>
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
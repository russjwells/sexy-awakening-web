import React, { Component, useState, useContext, useEffect, useCallback } from 'react';
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
    const authUser = useContext(AuthUserContext)
    const {userData, setUserData} = useContext(UserDataContext)
    console.log(props)
    const [loading, setLoading] = useState(true)
    
    const [drawer, setDrawer] = useState(false)
    const [activeScreen, setActiveScreen] = useState("profile")
    //const [authUser, setAuthUser] = useState(props.authUser)
    
    const toggleDrawer = () => {
        setDrawer(d => !d)
    }
    const menuPress = () => {
        toggleDrawer()
    }

    const screens = ['profile', 'swipes', 'matches']

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') toggleDrawer()
            if (e.key === 'Tab') {
                e.preventDefault()
                setActiveScreen(current => {
                    const idx = screens.indexOf(current)
                    return screens[(idx + 1) % screens.length]
                })
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])
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

    /*
    const loadUserData = useCallback(async (uid) => {
        const snap = await db.onceGetUserData(uid).then((snap) => {
          const data = snap.val()
          console.log(data)
          setLoading(false)
          setUserData(data)
        })
    },[uid])
    */

   
    //run did mount
    useEffect(() => {
      (async () => {
        //console.log("use effect: " + authUser.uid)
        if (authUser.uid != null){
          //console.log('uid' + authUser.uid)
          if (loading){
            //loadUserData(props.authUser.uid)
            const snap = await db.onceGetUserData(authUser.uid)
            const data = snap.val()
            console.log("setting data:" + data)
            setLoading(() => false)
            setUserData(() => data)
          } else {
            console.log("data already loaded")
          }
          
          
        } else {
          console.log("no user id")
        }
      })()
      //console.log("use effect: " + authUser.uid)
    }, [authUser.uid])

    
    
    return (
          <div className={css(styles.container)}>
            <Drawer
                open={drawer}
                onChange={setDrawer}
                zIndex={10000}
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
                activeScreen={activeScreen}
                authUser={authUser}
            />
            <WebScroller 
                screens={[
                    <Profile 
                        authUser={authUser}
                    />,
                    <Swipes 
                        authUser={authUser}
                        user={userData}
                    />,
                    <Matches 
                        authUser={authUser}
                    />,
                ]}
                screen={activeScreen}
            />
            <Footer />
        </div>
    )
    
}
//Home.contextType = AuthUserContext
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
  });
  
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Home);
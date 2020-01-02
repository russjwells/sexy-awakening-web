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
import withAuthorization from '../components/withAuthorization';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log('app on')
    }
    state = {
        activeScreen: "profile",
        profileIndex: 0,
        profiles: [],
        drawer: false,
        //user: this.props.navigation.state.params.user,
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
    render(){
        return (
            <div className={css(styles.container)}>
                <Drawer 
                    //open={}
                    zIndex={10000}
                    //onChange={this.drawerChanged(this.state.drawer)}
                >
                    <Menu />
                </Drawer>
                <NavBar 
                    menuPress={this.menuPress}
                    profilePress={this.profilePress}
                    swipesPress={this.swipesPress}
                    matchesPress={this.matchesPress}
                />
                <WebScroller 
                    screens={[
                        <Profile />,
                        <Swipes />,
                        <Matches />,
                    ]}
                    user={this.props.user}
                    screen={this.state.activeScreen}
                />
                <Footer />
            </div>
        )
    }
}

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
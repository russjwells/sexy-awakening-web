import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NavBar from '../components/navBar';
import Footer from '../components/footer'
import WebScroller from '../components/webScroller'
import Drawer from 'react-motion-drawer';
import Menu from '../components/menu'
import withAuthorization from '../components/withAuthorization';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log('app on')
    }
    state = {
        drawer: false
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
    }
    profilePress = () => {
        console.log('profile pressed home')
    }
    swipesPress = () => {
        console.log('swipes pressed home')
    }
    matchesPress = () => {
        console.log('matches pressed home')
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
                    //screens={[
                    //    <Profile />,
                    //    this.cardStack(),
                    //    <Matches />
                    //]}
                    user={this.props.user}
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
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
    render(){
        return (
            <div className={css(styles.container)}>
                <Drawer 
                    open={true}
                    zIndex={10000}
                    //onChange={onChange}
                >
                    <Menu />
                </Drawer>
                {<NavBar />}
                {<WebScroller 
                    //screens={[
                    //    <Profile />,
                    //    this.cardStack(),
                    //    <Matches />
                    //]}
                    user={this.props.user}
                />}
                {<Footer />}
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
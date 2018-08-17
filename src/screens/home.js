import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import phoenixred from '../components/phoenix_red.svg';
import NavBar from '../components/navBar';
import Footer from '../components/footer'
import WebScroller from '../components/webScroller'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={css(styles.container)}>
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
  
  
  export default Home;
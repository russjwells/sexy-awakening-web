import React, { Component } from 'react';

import { StyleSheet, css } from 'aphrodite';

class WebScroller extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className={css(styles.content)}>
                <div className={css(styles.flex)}>
                    Welcome home, {this.props.user.first_name}!
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    content: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around'
    },
    flex: {
        display: 'flex',
        flex: 1,
    }
  });
  
  
  export default WebScroller
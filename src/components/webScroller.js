import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase';

class WebScroller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
          };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
          this.setState({ users: snapshot.val() })
        );
      }

    render(){
        const {users} = this.state;
        return (
            <div className={css(styles.content)}>
                <div className={css(styles.flex)}>
                {// !!users && <UserList users={users} /> 
                }
                <p>Welcome to the Sexy Awakening web app!</p>
                </div>
            </div>
        )
    }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of First Names of Users</h2>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].first_name}</div>
    )}
  </div>

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
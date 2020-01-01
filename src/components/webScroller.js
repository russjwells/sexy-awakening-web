import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../firebase';

class WebScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user: this.props.user
          };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
          this.setState({ users: snapshot.val() })
        );
      }

    render(){
        //const {users} = this.state;
        const user = this.state.user;
        return (
            <div className={css(styles.content)}>
                <div className={css(styles.flex)}>
                {// !!users && <UserList users={users} /> 
                }
                <p>Welcome to Sexy Awakening!</p>
                {//<p>{user.email}</p>
                }
                </div>
            </div>
        )
    }
}
/*
const UserList = ({ users }) =>
  <div>
    <h2>List of First Names of Users</h2>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].first_name}</div>
    )}
  </div>
*/
const styles = StyleSheet.create({
    content: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-around',
      flexDiretion: 'column'
    },
    flex: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        flexDiretion: 'column'
    }
  });
  
  
  export default WebScroller
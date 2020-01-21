import React {useState} from 'react';
import UserDataContext from './UserDataContext';
import { firebase } from '../firebase';

getUser = (uid) => {
  return firebase.database().ref('users').child(uid).once('value')
}

const withUserData = (Component) => {
  class WithUserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authUser: null,
          userData: null,
        };
      }
    
      componentDidMount() {
        const authUser this.state.authUser
        const user = getUser(authUser.uid)
        this.setState({userData: getUser(user)})
        //QUURY DATABASE FOR USER DATA AND SET LOCAL STATE 
        //
        //
        //REPLACEBELOW  
        //firebase.auth.onAuthStateChanged(authUser => {
        //  authUser
        //    ? this.setState({ authUser })
        //    : this.setState({ authUser: null });
        //});
      }
    render() {
      const { userData } = this.state;  
      return (
        <UserDataContext.Provider value={userData}>
          <Component />
        </UserDataContext.Provider>
      );
    }
  }

  return WithUserData;
}

export default withUserData;
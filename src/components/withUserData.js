import React from 'react';

import UserDataContext from './UserDataContext';
import { firebase } from '../firebase';

const withUserData = (Component) => {
  class WithUserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userData: null,
        };
      }
    
      componentDidMount() {
        //QUURY DATABASE FOR USER DATA AND SET LOCAL STATE 
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
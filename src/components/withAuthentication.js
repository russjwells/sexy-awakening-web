import React from 'react'
import AuthUserContext from './AuthUserContext'
import { firebase, db } from '../firebase'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authUser: null,
        };
      }
    
      componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        });
        
        
      }
    render() {
      const { authUser } = this.state;  
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication
}

const getUserData = async (uid) => {
  const snap = await db.onceGetUserData(uid)
    const data = snap.val()
    //console.log(data)
    //setUser(data)
    //setUserData(data)
    return data  
}

export default withAuthentication
import React, {useState} from 'react'
import UserDataContext from './UserDataContext'
import { firebase } from '../firebase'
import withAuthentication from './withAuthentication'
//getUser = (uid) => {
//  return firebase.database().ref('users').child(uid).once('value')
//}

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
        const authUser = this.state.authUser
        //const user = getUser(authUser.uid)
        //this.setState({userData: getUser(user)})

        const uid = authUser.uid
        firebase.database().ref('users').child(uid).on('value', snap => {
        const user = snap.val()
        this.setState({
          userData: user,
          profiles: [],
          profileIndex: 0,
        }, ()=>{
          console.log("data for "+this.state.userData.first_name + " is set in state in User Data context")
         })
        })
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
  return WithUserData
}

export default withUserData
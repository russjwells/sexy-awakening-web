import React, {Component} from 'react'
//import * as firebase from 'firebase'
import {View, Text, StyleSheet, Image} from 'react-primitives'

import CircleAvatar from '../components/circleAvatar'
//import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';
import chemistryIcon from '../img/chemistry.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Profile extends Component {
constructor(props) {
    super(props)
    this.state = {
        userData: this.props.userData
    }
}

componentWillReceiveProps(){
    //alert('props in')
}
render(){
    console.log(this.props.userData)
    /*
    if (this.state.userData !== null){
            const first_name = this.state.userData.first_name
            const uid = this.state.userData.uid
            const picture = this.state.userData.picture
            console.log(this.state.userData)
            return(
                <View style={styles.profile}>
                    {
                        <CircleAvatar uid={uid} pic={picture} size={120} />
                    }
                    <Text style={styles.text}>
                        {//first_name}
                        }
                    </Text>
                    <View style={styles.menuOptions}>
                        <View>
                            <Text>Edit Profile</Text>
                        </View>
                        <View>
                            <Text>Settings</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            */
            return(
                <View style={styles.profile}>
                    <View style={styles.userAvatar}>
                        <CircleAvatar size={120} />
                        <Text style={styles.text}>loading data...</Text>
                    </View>
                    <View style={styles.menuOptions}>
                        <View>
                            <FontAwesomeIcon icon={faEdit} size="2x" color="#000000" onClick={() => this.profileClick()} />
                            <Text>Edit Profile</Text>
                        </View>
                        <View>
                            <Image source={chemistryIcon} style={{width:40, height:40}} />
                            <Text>Settings</Text>
                        </View>
                    </View>
                </View>
        )
        }
    //const {email} = this.props.user
}

const styles = StyleSheet.create({
    profile: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'black',
        alignSelf: 'center'
    },
    menuOptions: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
});

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
//export default Profile;
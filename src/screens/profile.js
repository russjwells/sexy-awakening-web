import React, {Component} from 'react'
//import * as firebase from 'firebase'
import {View, Text, StyleSheet} from 'react-primitives'
import CircleAvatar from '../components/circleAvatar'
import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';

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
    if (this.state.userData != null){
            const {first_name, uid, picture} = this.state.userData
            console.log(this.state.userData)
            return(
                <View style={styles.profile}>
                    {
                        <CircleAvatar uid={uid} pic={picture} size={120} />
                    }
                    <Text style={styles.text}>
                        {first_name}
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
            return(
                <View style={styles.profile}>
                    <View style={styles.userAvatar}>
                        <CircleAvatar size={120} />
                        <Text style={styles.text}>loading data...</Text>
                    </View>
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
        }
    //const {email} = this.props.user
}}

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
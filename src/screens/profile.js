import React, {Component} from 'react'
//import * as firebase from 'firebase'
import {View, Text, StyleSheet} from 'react-primitives'
import CircleAvatar from '../components/circleAvatar'
import AuthUserContext from '../components/AuthUserContext';
import withAuthorization from '../components/withAuthorization';

class Profile extends Component {

render(){
    //const {first_name, uid, picture} = this.props.user
    //const {email} = this.props.user
    return(
        <AuthUserContext.Consumer>
        {authUser =>
            <View style={styles.profile}>
                {
                    //<CircleAvatar uid={uid} pic={picture} size={120} />
                }
                <Text style={styles.text}>
                    {
                        authUser.display_name+ ", "+ authUser.uid
                    }
                </Text>
            </View>
        }
        </AuthUserContext.Consumer>
    );
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
    }
});

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
//export default Profile;
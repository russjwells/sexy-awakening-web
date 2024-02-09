import React, { Component } from "react";
import {View, Text, StyleSheet, Image, Dimensions} from 'react-primitives'
import * as firebase from 'firebase'
import GeoFire from 'geofire'
import Card from "../components/card";
import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'

export default class Swipes extends Component {

    constructor(props){
        super(props)
    }


    state = {
        profileIndex: 0,
        profiles: [],
        authUser: this.props.authUser,
        user: this.props.user,
        latitude: null,
        longitude: null,
      }
    
    componentWillMount() {
        //console.log("authuser uid: "+this.state.authUser.uid)
        console.log("user uid: "+this.state.user.uid)
        const {uid} = this.state.user
        this.updateUserLocation(uid)
        firebase.database().ref('users').child(uid).on('value', snap => {
          const user = snap.val()
          this.setState({
            user,
            profiles:[],
            profileIndex:0,
          })
          //this.getProfiles(user.uid, user.distance)
        })
        //console.log('drawer state b4 mount:', this.state.drawer)
        
    }
    componentDidMount() {
        //console.log("user: "+this.state.user)
        

        const success = position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log(position)
        }
        navigator.geolocation.getCurrentPosition(success)
    }
    updateUserLocation = async(uid) => {
    


        
        //console.log("position: "+ latitude+", "+longitude)
        

    }

    showPosition(position){
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    cardStack = () => {
        //console.log("position: "+latitude+", "+longitude + ", " + "error: " + error)
        return(
            <View style={{flex: 1}}>
                {//profiles.slice(profileIndex, profileIndex + 1).reverse().map((profile, i) => {
                    //return(
                        <Card 
                            //key = {profile.id}
                            //profile = {profile}
                            //onSwipeOff ={nextCard}
                            //i = {i}
                        />
                    //)
                //})
                }
                
            </View>
        )
    }

    render(){
        return(
                <View style={styles.swipes}>
                    <View>
                        <Image source={romanceSymbol} style={{width:30, height:30}} />
                    </View>
                    <View style={styles.swipesMiddle}>
                        <View>
                            <Image source={friendshipSymbol} style={{width:30, height:30}} />
                        </View>
                        <View>
                            {this.cardStack()}
                        </View>
                        <View>
                            <Image source={sexSymbol} style={{width:60, height:60}} />
                        </View>
                    </View>
                    <View><Image source={passSymbol} style={{width:30, height:30}} /></View>
                </View>
            )
        }
        
}
const styles = StyleSheet.create({
    swipes: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'white',
      marginBottom: '20px'
    },
    swipesMiddle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '20px',
        //marginRight: '20px',
        //marginLeft: '20px'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'grey',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'space-around',
    }
});
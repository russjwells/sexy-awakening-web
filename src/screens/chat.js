import React, {Component, useState, useEffect, useContext}  from 'react'
import {View, Text, StyleSheet, Image, Dimensions} from 'react-primitives'
import { Link } from 'react-router-dom';
import { GiftedChat } from 'react-gifted-chat'
import * as firebase from 'firebase'
import * as routes from '../constants/routes';
import { ArrowLeft } from 'react-feather';
import CircleAvatar from '../components/circleAvatar'
//import styles from 'react-motion-drawer/styles';

export default class Chat extends Component {

    state = {
        messages: [],
        user: this.props.location.state.user,
        profile: this.props.location.state.chat,
      };
      componentWillMount() {
        //console.log('what chat: ' + this.props.location.state.chat.first_name)
        //console.log(this.props.location.state.user.first_name)
        /*
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
              },
            },
          ],
        });
        */
        //this.setState({profile: this.props.location.state.chat})
        //this.setState({user: this.props.location.state.user})
        const {user, profile} = this.state
        //const user = this.props.location.state.user
        //const profile = this.props.location.state.chat
        this.chatID = user.uid > profile.uid ? user.uid + '-' + profile.uid : profile.uid + '-' + user.uid
        console.log("chat_id:", this.chatID)
        this.watchChat()
      }

      watchChat = () => {
        firebase.database().ref('messages').child(this.chatID).on('value', snap => {
          let messages = []
          snap.forEach(message => {
            messages.push(message.val())
          })
          messages.reverse()
          this.setState({messages})
        })
      }
      /*
      onSend(messages = []) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      }
      */
      onSend = (message) => {
        firebase.database().ref('messages').child(this.chatID)
        .push({
          ...message[0],
          createdAt: new Date().getTime(),
        })
    }

    
      render() {
        const containerStyle = styles.container
        return (
            <div style={{containerStyle}}>
                <View style={styles.navbar}>
                    <Link to={routes.LANDING}>
                        <View style={styles.navback}>
                            <Text><ArrowLeft size={36} color="#000" /></Text>
                        </View>
                    </Link>
                    <View style={styles.navlocation}>
                        <View style={styles.chatnavlink}>
                            <CircleAvatar 
                                uid={this.state.profile.uid} 
                                pic={this.state.profile.picture} 
                                size={(40, 40)}
                            />
                            <Text style={styles.navtext}>{this.state.profile.first_name}</Text>
                        </View>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{_id:this.state.user.uid}} />
            </div>
                
            
          
        );
      }
    
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    content: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100px'
    },
    navback: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '100px',
        width: '100px',
        alignItems: 'center'
    },
    navright: {
        display: 'flex',
        height: '100px',
        width: '100px',
    },
    navlocation: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    chatnavlink:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    navtext: {
        display: 'flex',
        fontSize: '20px',
        marginLeft: '6px'
    },
    text: {
        display: 'flex',
        flex: 1,
        color: 'black',
        alignSelf: 'center',
        fontSize: '20px'
    },
    profileDisplay: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    userAvatar: {
        display: 'flex',
        flex: -1,
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        cursor: 'pointer'
    },
    menuOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    button: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
        
    },
    btntxt: {
        textAlignVertical: 'center'
    }
});
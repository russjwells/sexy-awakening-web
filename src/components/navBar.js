import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import { View, Text, Image, Touchable } from "react-primitives";
import redphoenix from './phoenix_red.svg';
import phoenix from '../svg/phoenix.svg';
import { Menu, Users } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'



export default class NavBar extends Component {
    state = {
        activeScreen:"profile"
    }
    clicked = (which) => {
        console.log(which)
        this.setState({activeScreen:which})
    
    }
    menuClick = () => {
        console.log("open drawer")
        this.props.menuPress()
    }
    profileClick = () => {
        this.props.profilePress()
        this.setState({activeScreen:"profile"})
    }
    swipesClick = () => {
        this.props.swipesPress()
        this.setState({activeScreen:"swipes"})
    }
    matchesClick = () => {
        this.props.matchesPress()
        this.setState({activeScreen:"matches"})
    }

    render(){
        const activeScreen = this.props.activeScreen || this.state.activeScreen
        return(
            <div className={css(styles.nav)}>
                <div className={css(styles.left)}>
                    {
                        activeScreen==="profile" && (
                            <div className={css(styles.clickable)}>
                                <Menu color="#000000" size={36} onClick={() => this.menuClick()} />
                            </div>
                        )
                    }
                    {
                        activeScreen!=="profile" && (
                            <div className={css(styles.clickable)}>
                                <FontAwesomeIcon icon={faUserCircle} size="2x" color="#000000" onClick={() => this.profileClick()} />
                            </div>
                        )
                    }
                </div>
                <div className={css(styles.center)}>
                    <div className={css(styles.titleHolder)}>
                        <div className={css(styles.flex)}>
                            {
                                activeScreen==="swipes" && (
                                    <div className={css(styles.clickable)}>
                                        <img src={redphoenix} onClick={() => this.swipesClick()} className={css(styles.logo)} alt="logo" width="100%" height="100%" />
                                    </div>
                                )
                            }
                            {
                                activeScreen!=="swipes" && (
                                    <div className={css(styles.clickable)}>
                                        <img src={phoenix} onClick={() => this.swipesClick()} className={css(styles.logo)} alt="logo" width="70%" height="70%" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={css(styles.right)}>
                    {
                        activeScreen==="matches" && (
                            <div className={css(styles.clickable)}>
                                <Users color="#e54560" size={36} onClick={() => this.matchesClick()} />
                            </div>
                        )
                    }
                    {
                        activeScreen!=="matches" && (
                            <div className={css(styles.clickable)}>
                                <Users color="#000000" size={36} onClick={() => this.matchesClick()} />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    flex:{
        display: 'flex',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    nav:{
        display: 'flex',
        flex:-1,
        backgroundColor: '#fff',
        height: '100px',
        //padding: 20,
        color: '#e54560',
        flexDirection: 'row',
        justifContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'skyblue'
    },
    left:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    center:{
        flex: 7,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: 'blue',
        flexDirection: 'row',
    },
    right:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    logo:{
        width: 60,
        height: 60,
    },
    titleHolder:{
        display: 'flex',
        flex:0,
        flexDirection: 'row',
    },
    title:{
        display: 'flex',
        
        //backgroundColor: '#fff',
        height: 100,
        minWidth: 300, 
        
        color: '#e54560',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        fontSize: 36,
        fontWeight: 'bold',
    },
    clickable:{
        cursor: 'pointer'
    }
})
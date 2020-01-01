import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite';
import phoenixred from './phoenix_red.svg';
//import Icon from '@expo/vector-icons/FontAwesome'

export default class NavBar extends Component {
    render(){
        return(
            <div className={css(styles.nav)}>
                <div className={css(styles.left)}>
                    <div>Menu</div>
                </div>
                <div className={css(styles.center)}>
                    <div className={css(styles.titleHolder)}>
                        <div className={css(styles.flex)}>
                            <img src={phoenixred} className={css(styles.logo)} alt="logo" />
                        </div>
                    </div>
                </div>
                <div className={css(styles.right)}>
                    <div>Matches</div>
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
        justifyContent: 'space-around'
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
        justifyContent: 'space-around'
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
})
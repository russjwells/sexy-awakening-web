import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-primitives'

import sexSymbol from '../img/sex.png'
import romanceSymbol from '../img/romance.png'
import friendshipSymbol from '../img/friendship.png'
import passSymbol from '../img/pass.png'

import sexSymbolRed from '../img/sex_red.png'
import romanceSymbolRed from '../img/romance_red.png'
import friendshipSymbolRed from '../img/friendship_red.png'
import passSymbolRed from '../img/pass_red.png'

import ReactList from 'react-list'

const demoProfiles = [
    {
      id: '259389830744794',
      first_name: 'Candice',
      birthday: '10/18/1986',
      work: [{position:{name:'Supermodel'}}],
    },
    {
      id: '720115413',
      first_name: 'Alessandra',
      birthday: '1/10/1989',
      work: [{position:{name:'Dancer'}}],
    },
    {
      id: '912478262117011',
      first_name: 'Rosie',
      birthday: '9/4/1989',
      work: [{position:{name:'Artist'}}],
    },
    {
      id: '1476279359358140',
      first_name: 'Alissa',
      birthday: '2/11/1990',
      work: [{position:{name:'Comedian'}}],
    },
    {
      id: '173567062703796',
      first_name: 'Kendall',
      birthday: '8/17/1992',
      work: [{position:{name:'Truck Driver'}}],
    },
    {
      id: '169571172540',
      first_name: 'Miranda',
      birthday: '12/12/1983',
      work: [{position:{name:'Doctor'}}],
    },
    {
      id: '1492309647685574',
      first_name: 'Behati',
      birthday: '3/23/1991',
      work: [{position:{name:'Developer'}}],
    },
    {
      id: '662254353934918',
      first_name: 'Anna',
      birthday: '3/23/1989',
      work: [{position:{name:'Personal Trainer'}}],
    },
    {
      id: '424154277777372',
      first_name: 'Gabriella',
      birthday: '3/23/1988',
      work: [{position:{name:'Surfer'}}],
    },
    {
      id: '662720103796952',
      first_name: 'Mara',
      birthday: '3/23/1987',
      work: [{position:{name:'Lifeguard'}}],
    },
  ]

class Matches extends Component {

    state = {
        accounts: [],
        matchType: 'sex'
    };

    filterList = (type) => {
        this.setState({matchType: type})
    }

    renderHeader = () => {
        return(
            <View style={styles.relationshipFilter}>
                <View style={styles.filterButton} onPress={() => this.filterList('sex')}>
                    <View style={[styles.filterButton, styles.sexFilter]}>
                        <Image source={this.state.matchType == 'sex' ? sexSymbolRed : sexSymbol} style={{width:70, height:70}} />
                    </View>
                </View>
                <View style={styles.filterButton} onPress={() => this.filterList('romance')}>
                    <View style={styles.filterButton}>
                        <Image source={this.state.matchType == 'romance' ? romanceSymbolRed : romanceSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
                <View style={styles.filterButton} onPress={() => this.filterList('friendship')}>
                    <View style={styles.filterButton}>
                        <Image source={this.state.matchType == 'friendship' ? friendshipSymbolRed : friendshipSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
                <View style={styles.filterButton} onPress={() => this.filterList('pass')}>
                    <View style={styles.filterButton}>
                        <Image source={this.state.matchType == 'pass' ? passSymbolRed : passSymbol} style={{width:40, height:40}} />
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.relationtypefilter]}>
                    {
                        this.renderHeader()
                    }
                </View>
                <View style={styles.list}>
                    <ReactList
                        itemRenderer={this.renderItem}
                        length={this.state.accounts.length}
                        type='uniform'
                    />
                </View>
            </View>
        );
    }}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    relationtypefilter:{
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    relationshipFilter:{
        flex:1,
        flexDirection:'row',
    },
    filterButton:{
        flex:1,
        height:60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sexFilter:{
        flex:1,
    },
    selectedFilter:{
        backgroundColor: 'red',
    },
    menuOption: {
        flex: 1,
    },
    chats: {
        flex: 9,
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,

    }
})




export default Matches;


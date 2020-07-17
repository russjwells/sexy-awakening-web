import React, {Component} from 'react'
import {Image} from 'react-primitives'
import axios from 'axios'
import seedBlk from '../img/seedoflife_black.png'

export default class CircleAvatar extends Component {
    state = {
        uid : this.props.uid,
        picName : this.props.pic,
        picture: null
    }

    componentDidMount() {
        this.getPic() 
    }

    getPic = async () => {
        const url = `https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-3/photo?uid=${this.state.uid}&pic=${this.state.picName}`;
        const res = await axios.get(url)
        //console.log(res)
        //console.log(res.data)
        const img = `data:image/jpg;base64,${res.data}`
        this.setState({picture: img})
    }


    render() {
        const {size} = this.props
        //console.log('uid '+uid)
        if (this.state.picture!=null){
        return(
            <Image 
            source={{uri: this.state.picture}}
            style={{width: size, height: size, borderRadius: size / 2}}
            />
        )
        }else{
            return(
                <Image 
                source={seedBlk}
                style={{width: size, height: size, borderRadius: size / 2}}
                />
            )
        }
    }
}
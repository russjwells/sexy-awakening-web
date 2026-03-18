import React, {Component} from 'react'
import {Image} from 'react-native'
import axios from 'axios'
import seedBlk from '../img/seedoflife_black.png'

const cache = new Map()

const fetchPhoto = async (uid, pic) => {
    const key = `${uid}:${pic}`
    if (cache.has(key)) return cache.get(key)
    const res = await axios.get(`/sexy-awakening-beta-3/photo?uid=${uid}&pic=${pic}`)
    const dataUrl = `data:image/jpg;base64,${res.data}`
    cache.set(key, dataUrl)
    return dataUrl
}

export default class SquareAvatar extends Component {
    state = { picture: null }

    componentDidMount() {
        this.load(this.props)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.uid !== this.props.uid || prevProps.pic !== this.props.pic) {
            this.load(this.props)
        }
    }

    load = async ({uid, pic}) => {
        if (!pic || pic === 'new') return
        const dataUrl = await fetchPhoto(uid, pic)
        this.setState({picture: dataUrl})
    }

    render() {
        const {size} = this.props
        const source = this.state.picture ? {uri: this.state.picture} : seedBlk
        return (
            <Image
                source={source}
                style={{width: size, height: size}}
            />
        )
    }
}

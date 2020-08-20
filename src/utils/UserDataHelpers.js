import React, {useContext} from 'react'
import AuthUserContext from '../components/AuthUserContext'
//const {auth} = useContext(AuthUserContext)

const UserDataHelpers = async () => {
    return {
        payload: "thing"
    }
}

const login = async () => {
    return {
        id: 4,
        username: "bob",
        email: "bob@bob.com"
    }
}

const getUserData = async () => {

}

export default UserDataHelpers
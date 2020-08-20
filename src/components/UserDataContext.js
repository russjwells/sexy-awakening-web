import React from 'react'
const UserDataContext = React.createContext(defaultData)
export default UserDataContext

const defaultData = {
    ageRange: [18,60],
    distance: [200],
    immediacy: 0,
    sexuality: 0,
    romance: 0,
    friendship: 0,
    approachable: false,
    visible: true,
    showMen: true,
    showWomen: true,
    showNonbinary: true,
    showTransmen: true,
    showTranswomen: true,
    showGroups: true,
    bio: "This is a new profile...",
    first_name: "new",
    uid: "new",
    picture: "new"
  }
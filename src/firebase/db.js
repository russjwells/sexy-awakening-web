import { db } from './firebase';

// User api

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const onceGetUsers = () => 
    db.ref('users').once('value');

export const onceGetUserData = (uid) => 
    db.ref(`users`).child(uid).on('value', snap => {
        const user = snap.val()
        return user
    })
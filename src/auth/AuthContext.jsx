import React, { useContext, useState, useEffect } from "react"
import { auth } from "../../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithRedirect,
    GoogleAuthProvider
} from 'firebase/auth'
import Loader from "../components/Loader"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: "select_account"
    });

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function loginGoogle() {
        return signInWithRedirect(auth, provider)
    }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email)
    // }

    // function updatePassword(password) {
    //     return currentUser.updatePassword(password)
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loading,
        loginGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <Loader message='Loading, please wait...' />}
        </AuthContext.Provider>
    )
}
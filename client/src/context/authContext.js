import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
import { emptyCardSuccess } from '../redux/cartReducer';


const AuthContext = React.createContext({
    token: '',
    userData: null,

    isLoggedIn: false,
    login: (token, userData) => { },
    updateUser: (userData) => {},
    logout: () => { }

})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const initialUserData = JSON.parse(localStorage.getItem('userData'));
    const [token, setToken] = useState(initialToken)
    const [userData, setUserData] = useState(initialUserData);

    const userIsLoggedIn = !!token

    const loginHandler = (token, newUserData) => {
        setToken(token)
        setUserData(newUserData);
        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(newUserData));


    }
    const updateUser=(newUserData)=>{
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
    }

    const logout = () => {
        setToken(null)
        setUserData(null);
        localStorage.removeItem('token')
        localStorage.removeItem('userData');
      

    }

    const contextValue = {
        token: token,
        userData: userData,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        updateUser,
        logout: logout
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
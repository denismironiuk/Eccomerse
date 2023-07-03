import React,{useState} from 'react'


const AuthContext=React.createContext({
    token:'',
    name:'',
    isLoggedIn:false,
    login:(token,name)=>{},
    logout:()=>{}

})

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token')
    const initialName=localStorage.getItem('name')
    const[token,setToken]=useState(initialToken)
    const[name,setName]=useState(initialName)

    const userIsLoggedIn=!!token

    const loginHandler=(token,name)=>{
        setToken(token)
        setName(name)
        localStorage.setItem('token',token)
        localStorage.setItem('name',name)
        
    }

    const logout=()=>{
        setToken(null)
        setName(null)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
    }

    const contextValue={
        token:token,
        name:name,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logout
    }


return  <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
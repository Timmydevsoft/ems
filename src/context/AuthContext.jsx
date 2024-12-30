import { createContext,useContext, useEffect, useState } from "react";
const AuthContext = createContext({token: "", userName:"", role: "", id:"", menu:false})

const AuthProvider = ({children})=>{
    const[auth, setAuth] = useState({token: "", userName:"", role: "", id:"", menu: false})
    const logOut = ()=>{
        setAuth({token: "", userName:"", role: "", id:"", menu: false})
    }
    const handleMenu = ()=>{
        setAuth((prev)=>{
            return({...prev, menu:!prev.menu})
        })
    }

    return(
        <AuthContext.Provider value={{auth, setAuth,handleMenu ,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

export const useAuth = ()=> useContext(AuthContext)
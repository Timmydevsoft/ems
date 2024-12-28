import { createContext,useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {  } from "react";
const AuthContext = createContext({token: "", userName:"", role: "", id:""})

const AuthProvider = ({children})=>{
    const[auth, setAuth] = useState({token: "", userName:"", role: "", id:""})
    

    const login = ()=>{

    }

    const logOut = ()=>{
        setAuth("")
    }

    return(
        <AuthContext.Provider value={{auth, setAuth, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

export const useAuth = ()=> useContext(AuthContext)
import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"
const PrivateRoute = ({children})=>{

    const{userName} = useAuth()
    if(userName){
        return(<div>Loading....</div>)
    }

    return userName===""? <Navigate to="/login" />: children
}

export default PrivateRoute
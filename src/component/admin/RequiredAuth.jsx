import {useLocation, Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
const RequiredAuth = ()=>{
    const{auth} = useAuth();
    const location = useLocation()
    return(
        auth?.userName ?
        <Outlet/>:
        <Navigate to="/login" state={{from: location}} replace/>
    )
}
export default RequiredAuth
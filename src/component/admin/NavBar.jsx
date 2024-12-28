import { useAuth } from "../../context/AuthContext"
const NavBar =()=>{
    const{auth, logOut} = useAuth()
    return(
        <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
            <p>Welcome, {auth.userName}</p>
            <button onClick={()=>logOut()} className="px-4 py-1 bg-teal-700 hover:bg-teal-800">Log out</button>
        </div>
    )
}
export default NavBar
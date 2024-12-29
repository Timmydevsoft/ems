import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import AdminSideBar from "../component/admin/AminSideBar"
import NavBar from "../component/admin/NavBar"

const AdminDashBoard = ()=>{
    const{auth} = useAuth()
    const[loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(
        ()=>{
            const veryfyUser = async()=>{
                try{
                    let status;
                    const response = await axios.get("https://ems-api-3nt7.onrender.com/api/verify",
                        {
                            headers:{
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${auth.token}`
                            }
                        }
                    )
                    status = response.status
                    if(status === 200){
                        setLoading(false)
                    }
                }
                catch(err){
                    console.log(err)
                    navigate("/login")
                }
            }
            veryfyUser()
        },
        []
    )
    // if(loading){
    //     return(
    //         <div className="w-full h-screen flex items-center justify-center">
    //             <Loading/>
    //         </div>
    //     )
    // }
    return(
        <div className="flex overflow-y-hidden relative">
            <AdminSideBar/>
            <div className="w-full flex flex-col lg:flex-1 h-screen lg:ml-64 bg-gray-100 overflow-y-hidden">
               <NavBar/>
              <div className="overflow-y-auto">
                 <Outlet />
              </div>
            </div>
            
        </div>
    )
}
export default AdminDashBoard
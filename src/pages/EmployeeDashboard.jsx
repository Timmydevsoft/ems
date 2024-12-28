import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import NavBar from "../component/admin/NavBar"
import AdminSummary from "../component/admin/AdminSummary"
import EmployeeSideBar from "../component/EmployeeDasBoard/EmployeeSideBar"

const EmployeeDashboard = ()=>{
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
    if(loading){
        return(
            <div className="text-teal-600 font-medium text-3xl"> Loading....</div>
        )
    }
    return(
        <div className="flex overflow-y-hidden">
            <EmployeeSideBar/>
            <div className="flex flex-col flex-1 h-screen ml-64 bg-gray-100 overflow-y-hidden">
               <NavBar/>
              <div className="overflow-y-auto">
                 <Outlet />
              </div>
            </div>
            
        </div>
    )
}
export default EmployeeDashboard
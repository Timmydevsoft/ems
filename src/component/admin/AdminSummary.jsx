import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import SummaryCard from "./SummaryCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const AdminSummary = ()=>{
    const{auth} = useAuth()
    const[summary, setSummary]= useState(null)
    useEffect(
        ()=>{
            const getSummary = async()=>{
                try{
                    const res = await axios.get("https://employee-management-api-xi.vercel.app/api/dashboard", 
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`
                            }
                        }
                    )
                    setSummary(res.data)
                }
                catch(err){
                    alert(err.message)
                    console.log(err)
                }
            }
            getSummary()
        },[]
    )
    return(
       <>
        {
            summary === null ?
            (<div className="text-2xl text-teal-600 ">Loading ......</div>):
            (
                <div className="p-6">
                <h3 className="text-2xl font-bold">Dashboard Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <SummaryCard 
                        icon={<FaUsers/>}
                        text="Total Employees"
                        number={summary.totalEmployee}
                        color="bg-teal-600"
                    />
    
                    <SummaryCard 
                        icon={<FaBuilding/>}
                        text="Total Departments"
                        number={summary.totalDepartment}
                        color="bg-yellow-500"
                    />
    
                     <SummaryCard 
                        icon={<FaMoneyBillWave/>}
                        text="Monthly Salary"
                        number={`$ ${summary.salaryTotal[0].totalSalary}`}
                        color="bg-rose-600"
                    />
                </div>
    
                <div className="mt-12">
                    <h4 className="text-2xl text-center font-bold">Leave Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
                    <SummaryCard 
                        icon={<FaFileAlt/>}
                        text="Leave Applied"
                        number={summary.totalApplied}
                        color="bg-teal-600"
                    />
                    <SummaryCard 
                        icon={<FaCheckCircle/>}
                        text="Leave Approved"
                        number={summary.approved}
                        color="bg-teal-300"
                    />
                    <SummaryCard
                        icon={<FaHourglassHalf/>}
                        text="Leave Pending"
                        number={summary.pending}
                        color="bg-yellow-600"
                    />
                    <SummaryCard 
                        icon={<FaTimesCircle/>}
                        text="Leave Rejected"
                        number={summary.rejected}
                        color="bg-rose-600"
                    />
    
                    </div>
                </div>
            </div>
            )
        }
       </>
    )
}
export default AdminSummary
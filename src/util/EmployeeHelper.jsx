import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
// import { windows } from "appjs"
export const leavesColumn = [
    {
        name: "S/N",
        selector: (row)=>row.sno,
        width: "100px",
    },
    {
        name: "Emp Id",
        selector: (row)=>row.employeeId,
        width: "100px",
        sortable: true
      
    },
    {
        name: "Name",
        selector: (row)=>row.name,
        width: "120px",
        sortable: true
      
    },
    {
        name: "Leave Type",
        selector: (row)=>row.leaveType,
        width: "140px",
        sortable: true
      
    },
    {
        name: " Department",
        selector: (row)=>row.department,
        width: "120px",
    },
    {
        name: "Days",
        selector: (row)=>row.days,
        width: "200px"
    },
    {
        name: " Status",
        selector: (row)=>row.status,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row)=>row.action,
        center: "true"
    }
]
export const columns = [
    {
        name: "S No",
        selector: (row)=>row.sno,
        width: "70px",
    },
    {
        name: "Name",
        selector: (row)=>row.name,
        width: "100px",
        sortable: true
      
    },
    {
        name: "Image",
        selector: (row)=>row.profileImage,
        width: "150px"
    },
    {
        name: "Department",
        selector: (row)=>row.dep_name,
        width: "200px"
    },
    {
        name: "DOB",
        selector: (row)=>row.dob,
        width: "200px",
        sortable: true
    },
    {
        name: "Action",
        selector: (row)=>row.action,
        center: "true"
    }
]

export const ViewButtonLeave = ({id})=>{
    const navigate = useNavigate()
    return(
        <div className="flex items center space-x-9">
            <button onClick={()=> navigate(`/admin-dashboard/leave/${id}`)} className="px-4 py-1 text-white text-base bg-teal-600 rounded-sm hover:bg-teal-700">View</button>
        </div>
    )
}




export const EmployeeButton = ({id, handleSorting})=>{
    const navigate = useNavigate()
    const{auth} = useAuth()
    
    
    return(
        <div className="flex items center space-x-9">
            <button onClick={()=> navigate(`/admin-dashboard/employee/${id}`)} className="px-4 py-1 text-white text-base bg-teal-600 rounded-sm">View</button>
            <button onClick={()=> navigate(`/admin-dashboard/employee/edit/${id}`)} className="px-4 py-1 text-white text-base bg-blue-600 rounded-sm">Edit</button>
            <button onClick={()=>navigate(`/admin-dashboard/employees/salary/${id}`)} className="px-4 py-1 text-white text-base bg-yellow-500 rounded-sm">Salary</button>
            <button onClick={()=>navigate(`/admin-dashboard/employees/leave/${id}`)}  className="px-4 py-1 text-white text-base bg-red rounded-sm">Leave</button>
        
        </div>
    )
}
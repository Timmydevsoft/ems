import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import DataTable from "react-data-table-component"
import { columns, DepartmentButton } from "../../util/DepartmentHelper"
import { useState } from "react"
import axios from "axios"

const DepartmentList = ()=>{
    const{auth} = useAuth()
    const[departments, setDepartments]=useState([])
    const[loading,setLoading] =useState(true)
    const[filterData,setFilterData]= useState([])
    const handleSorting = (id)=>{
       setDepartments((prev)=>{
        return prev.filter(item=> item._id !==id)
       })
        
    }

    const handleFilter = ()=>{
        const newFilter = departments.filter((item)=> item.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterData(newFilter)
    }
    
    useEffect(
        ()=>{
            const getDepartment = async()=>{
                try{
                    let s_no = 1
                    const response = await axios.get("http://localhost:3000/api/departments",
                        {
                            headers: {
                                "Authorization": `Bearer ${auth.token}`
                            }
                        }
                    )
                    const data = await response.data.departments.map((item)=>{
                        return(
                            {
                                _id: item._id,
                                sno: s_no++,
                                dep_name: item.dep_name,
                                action: (<DepartmentButton id={item._id} handleSorting={handleSorting}/>)
                            }
                        )
                    })
                    setDepartments(data)
                    setLoading(false)
                }
                catch(err){
                    console.log(err)
                }
            }
            getDepartment()
        },
        []
    )
    if(loading){
        return(<div className="text-3xl text-teal-500 font-bold">Loading.....</div>)
    }

    
    return(
        <div className=" space-y-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Departments</h3>
            </div>
            <div className="flex items-center justify-between">
                <input onChange={handleFilter} type="text" placeholder="Search By Dep Name" className="px-5 pt-0.5 h-10  border rounded text-white" />
                <Link className="px-4 py-1  bg-teal-600 font-bold rounded text-white" to="/admin-dashboard/add-department">Add New Department</Link>
            </div>
            <div className="">
                <DataTable
                  data={departments}
                  columns={columns}
                  pagination
                />
            </div>
        </div>
    )
}
export default DepartmentList
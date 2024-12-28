import axios from "axios"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"


const AddDepartment =()=>{
    const{auth}= useAuth()
    const navigate = useNavigate()
    const[department, setDepartment] = useState({dep_name: "", description: ""})
    const handleChange = (e)=>{
        const{name, value} = e.target
        setDepartment((prev)=>{
            return({...prev, [name]: value})
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("https://employee-management-api-xi.vercel.app/api/department/add", department,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            })
            if(response.status ==201){
                navigate("/admin-dashboard/departments")
            }
            else{
                console.log(response.status)
            }

        }
        catch(err){
            console.log(err)
        }
    }   
    return(
        <div className="max-w-3xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md w-96">
            
                <h3 className="text-2xl font-bold mb-6">Add Department</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700" htmlFor="dep_name">Department Name: <span className="text-rose-500 font-bold text-xl">*</span></label>
                    <input 
                        type="text"
                        name="dep_name"
                        placeholder="Enter Dep Name"
                        onChange={handleChange}
                        required 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                       
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">Add Description: <span className="text-rose-500 font-bold text-xl">*</span></label>
                    <textarea 
                        name="description"
                        placeholder="Add Description"
                        onChange={handleChange}
                        className="block mt-1 p-2 w-full border border-gray-300 rounded-md"
                        rows="4"
                        required
                        ></textarea>
                </div>
                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Add Department</button>
            </form>
        </div>
    )
}
export default AddDepartment
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const AddNewLeave = ()=>{
    const{auth} = useAuth()
    const[leave, setLeave]=useState()
    const navigate = useNavigate()
    const handleChange = (e)=>{
       const{name, value} = e.target
    
       setLeave((prev)=>{
        return({...prev, [name]:value})
       })

    }

    const handleSubmit = async(e)=>{
        let userId = auth.id
        let formData = {...leave, userId}
        e.preventDefault()
        try{
            const response = await axios.post("https://ems-7200.onrender.com/api/leave/add",formData,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization:`Bearer ${auth.token}`
                    }
                }
            )
            if(response.status === 201){
               navigate(`/employee-dashboard/leave/${auth.id}`)
            }
        }
        catch(err){
            alert(err)
            console.log(err)
        }

    }
    return(
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Request for leave</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700"></label>
                        <select 
                            type="text" 
                            name="leaveType"
                            // value={leave.leaveType}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Selecte Leave Type</option>
                            {
                                ["Sick Leave", "Casual Leave", "Annual Leave"].map((item, index)=>
                                    (<option key={index} value={item} className="">{item}</option>)
                                )
                            }
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* From date */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700" >From Date</label>
                            <input 
                                type="date" 
                                name="startDate"
                                // value={leave.startDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* End Date */}
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700" >End Date</label>
                            <input 
                                type="date" 
                                name="endDate"
                                // value={leave.endDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* Description */}
                        <div>
                            <label htmlFor="descriptin" className="block text-sm font-medium text-gray-700" >Description</label>
                            <textarea 
                                name="reason"
                                placeholder="Reason"
                                onChange={handleChange}
                                className="w-full border p-1 border-gray-300 rounded-md"
                                required
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <button 
                    className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-md"
                >Add Leave</button>
            </form>
        </div>
    )
}
export default AddNewLeave 
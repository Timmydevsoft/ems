import { FaUser } from "react-icons/fa"
import { useAuth } from "../../context/authContext"

FaUser
const EmployeeSummaryCard = ()=>{
    const{auth} = useAuth()
    return(
        <div className="flex bg-white rounded-md">
            <div className={`flex items-center justify-center bg-teal-600 text-white text-3xl w-16`}>
                <FaUser/>
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Welcome back</p>
                <p className="text-xl font-bold">{auth.userName}</p>
            </div>
        </div>
    )
}
export default EmployeeSummaryCard 
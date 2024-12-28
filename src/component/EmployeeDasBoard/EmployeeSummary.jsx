import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import EmployeeSummaryCard from "./EmployeeSummaryCard"

const EmployeeSummary = ()=>{
    return(
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <EmployeeSummaryCard/>
            </div>
        </div>
    )
}
export default EmployeeSummary
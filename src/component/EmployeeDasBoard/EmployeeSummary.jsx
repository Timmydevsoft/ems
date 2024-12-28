import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import EmployeeSummaryCard from "./EmployeeSummaryCard"

const EmployeeSummary = ()=>{
    return(
        <div className="p-6">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <EmployeeSummaryCard/>
            </div>

            {/* <div className="mt-12">
                <h4 className="text-2xl text-center font-bold">Leave Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
                <SummaryCard 
                    icon={<FaFileAlt/>}
                    text="Leave Applied"
                    number={3}
                    color="bg-teal-600"
                />
                <SummaryCard 
                    icon={<FaCheckCircle/>}
                    text="Leave Approved"
                    number={3}
                    color="bg-teal-300"
                />
                <SummaryCard
                    icon={<FaHourglassHalf/>}
                    text="Leave Pending"
                    number={2}
                    color="bg-yellow-600"
                />
                <SummaryCard 
                    icon={<FaTimesCircle/>}
                    text="Leave Rejected"
                    number={3}
                    color="bg-rose-600"
                />

                </div>
            </div> */}
        </div>
    )
}
export default EmployeeSummary
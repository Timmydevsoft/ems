import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../uiexperience/ProgressBar";

const AdminSummary = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const getSummary = async () => {
      try {
        const res = await axios.get(
          "https://ems-api-3nt7.onrender.com/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setSummary(res.data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
      }
    };
    getSummary();
  }, []);
  return (
    <>
      {summary !== null && !loading ? (
        <div className="w-full h-screen p-10 flex items-center justify-center flex-col space-y-4">
          <p className="text-2xl text-teal-600 ">Loading ...</p>
          <ProgressBar />
        </div>
      ) : (
        <div className="p-6 lg:block flex flex-col items-center w-full lg:auto">
          <h3 className="text-2xl font-bold text-center w-full ">Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
            <SummaryCard
              icon={<FaUsers />}
              text="Total Employees"
              number={summary.totalEmployee}
              color="bg-teal-600"
            />

            <SummaryCard
              icon={<FaBuilding />}
              text="Total Departments"
              number={summary.totalDepartment}
              color="bg-yellow-500"
            />

            <SummaryCard
              icon={<FaMoneyBillWave />}
              text="Monthly Salary"
              number={`$ ${
                summary?.salaryTotal?.length === 0
                  ? 0
                  : summary.salaryTotal[0].totalSalary
              }`}
              color="bg-rose-600"
            />
          </div>

          <div className="mt-12 w-full lg:w-auto">
            <h4 className="text-2xl text-center font-bold">Leave Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
              <SummaryCard
                icon={<FaFileAlt />}
                text="Leave Applied"
                number={summary.totalApplied}
                color="bg-teal-600"
              />
              <SummaryCard
                icon={<FaCheckCircle />}
                text="Leave Approved"
                number={summary.approved}
                color="bg-teal-300"
              />
              <SummaryCard
                icon={<FaHourglassHalf />}
                text="Leave Pending"
                number={summary.pending}
                color="bg-yellow-600"
              />
              <SummaryCard
                icon={<FaTimesCircle />}
                text="Leave Rejected"
                number={summary.rejected}
                color="bg-rose-600"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminSummary;

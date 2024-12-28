import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();
  // The id above is userId if it's coming from the employee-dahboard and it's employeeId if it's coming from admin-dashboard
  useEffect(() => {
    const getLeaveList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/leave/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setLeaves(response.data);
      } catch (err) {
        alert(err.message);
      }
    };
    getLeaveList();
  }, []);

  let s_no = 1;
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search By Status"
          className="px-4 py-2 font-semibold border rounded"
        />
        {auth.role === "Employee" && (
          <NavLink
            to="/employee-dashboard/add-leave"
            className="px-4 font-semibold py-2 rounded bg-teal-600 text-white"
          >
            Add New Leave
          </NavLink>
        )}
      </div>

      {/* Table starts here */}

      {leaves.length > 0 ? (
        <table className="w-full text-sm text-gray-500 text-left mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            {[
              "SNO",
              "LEAVE TYPE",
              "FROM",
              "TO",
              "DESCRIPTION",
              "APPLIED DATE",
              "STATUS",
            ].map((item) => {
              return (
                <th key={item} className="px-6 py-3">
                  {item}
                </th>
              );
            })}
          </thead>
          <tbody>
            {leaves.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3">{s_no++}</td>
                  <td className="px-6 py-3">{item.leaveType}</td>
                  <td className="px-6 py-3">
                    {new Date(item.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(item.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{item.reason}</td>
                  <td className="px-6 py-3">
                    {new Date(item.ApplieddAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full bg-white p-3 mt-6">
          <p className="text-base font-semibold text-center">No records</p>
        </div>
      )}
    </div>
  );
};
export default LeaveList;

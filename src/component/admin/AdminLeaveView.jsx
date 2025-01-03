import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../uiexperience/ProgressBar";
const AdminLeaveView = () => {
  const [leaves, setLeaves] = useState(null);
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const getLeaveList = async () => {
      try {
        const response = await axios.get(
          `https://ems-api-3nt7.onrender.com/api/leave/${id}`,
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

  const navigate = useNavigate();
  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://ems-api-3nt7.onrender.com/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        setLeaves((prev) => {
          return { ...prev, status: "Accepted" };
        });
        return navigate("/admin-dashboard/leaves");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      {leaves === null ? (
        <div className="w-full h-screen p-10 flex items-center justify-center flex-col space-y-4">
          <p className="text-2xl text-teal-600 ">Loading ...</p>
          <ProgressBar />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h3 className="text-center text-2xl font-bold mb-10">Leave Details</h3>
          <div className="grid grid-cols-1 lg:flex lg:items-center lg:space-x-10 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`https://ems-api-3nt7.onrender.com/public/uploads/${leaves.employeeId.userId.profileImage}`}
                alt=""
                className="rounded-full w-72 h-72 border"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Name: </p>
                <p className="font-medium">{leaves.employeeId.userId.name}</p>
              </div>
              {/* <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                    <p className="text-lg font-bold">Employee Id: </p>
                    <p className="font-medium">{leaves.employeeId}</p>
                  </div> */}
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Leave Type: </p>
                <p className="font-medium">{leaves.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Reason: </p>
                <p className="font-medium">{leaves.reason}</p>
              </div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Department: </p>
                <p className="font-medium">
                  {leaves.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Employee Id: </p>
                <p className="font-medium">{leaves.employeeId.employeeId}</p>
              </div>

              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">Start Date: </p>
                
                <p className="font-medium">
                  {new Date(leaves.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">End Date: </p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-5 w-full justify-center lg:justify-start">
                <p className="text-lg font-bold">
                  {leaves.status === "Pending" ? "Status" : "Action"}
                </p>
                {leaves.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 bg-teal-300 hover:bg-teal-400 rounded-md text-white"
                      onClick={() => changeStatus(leaves._id, "Approved")}
                    >
                      Aprove
                    </button>
                    <button
                      className="px-2 py-1 bg-rose-400 hover:bg-rose-500 text-white rounded-md"
                      onClick={() => changeStatus(leaves._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leaves.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminLeaveView;

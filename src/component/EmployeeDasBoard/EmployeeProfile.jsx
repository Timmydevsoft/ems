import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../uiexperience/ProgressBar";

const EmployeeProfile = () => {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [employee, setEmployee] = useState(null);
  const formatDate = (datestring) => {
    const date = new Date(datestring);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
  };
  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-api-3nt7.onrender.com/api/employee/profile/${auth.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployee(response.data);
          setLoading(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEmployee();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen p-10 flex items-center justify-center flex-col space-y-4">
        <p className="text-2xl text-teal-600 ">Loading ...</p>
        <ProgressBar />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {employee !== null ? (
        <div className="f-full h-full">
          <h2 className="text-2xl font-bold  mb-8 text-center">
            Employee Details
          </h2>
          <div className=" flex flex-col items-center lg:grid lg:grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                className="rounded-full border w-72 h-72"
                src={`https://ems-api-3nt7.onrender.com/public/uploads/${employee.userId.profileImage}`}
                alt=""
              />
            </div>

            <div className="">
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name: </p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee Id: </p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">DOB: </p>
                <p className="font-medium">{formatDate(employee.dob)}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender: </p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department: </p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Martal Status: </p>
                <p className="font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default EmployeeProfile;

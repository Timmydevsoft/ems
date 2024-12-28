import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [dep, setDep] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    emp_name: "",
    marital_status: "",
    designation: "",
    department: "",
    department_name: "",
    salary: "",
  });
 
  const { id } = useParams();

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (response.status === 200) {
          setEmployeeDetails({
            emp_name: response.data.userId.name,
            marital_status: response.data.maritalStatus,
            designation: response.data.designation,
            department: response.data.department._id,
            department_name: response.data.department.dep_name,
            salary: response.data.salary
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getEmployee();
  }, []);

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/departments",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const depsData =  response.data.departments.map((item) => {
          return { dep_name: item.dep_name, id: item._id };
        });
        setDep(depsData);
      } catch (err) {
        console.log(err);
      }
    };
    getDepartment();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prev) => {
      return({...prev, [name]: value})
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let departmentSelected =  dep.filter((item)=> item.dep_name === employeeDetails.department_name)
        const data = {
          name: employeeDetails.emp_name,
          maritalStatus: employeeDetails.marital_status,
          designation: employeeDetails.designation,
          department: departmentSelected[0].id,
          salary: employeeDetails.salary
        }
  
      const response = await axios.put(
        `http://localhost:3000/api/employee/edit/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        navigate("/admin-dashboard/employees");
      } else {
        console.log(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {employeeDetails !== null ? (
        <div className="max-w-4xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md">
          <h3 className="text-2xl font-bold mb-6">Edit Employee</h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cold-1 md:grid-cols-2 gap-4">
              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="dep_name"
                >
                  Name:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="emp_name"
                  placeholder="Enter Name"
                  value={employeeDetails.emp_name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="marital_status"
                >
                  Marital Status:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>

                <select
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  name="marital_status"
                  value={employeeDetails.marital_status}
                  onChange={handleChange}
                  required
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="designation"
                >
                  Designation:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={employeeDetails.designation}
                  placeholder="Designation"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="dep_name"
                >
                  Salary:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="salary"
                  value={employeeDetails.salary}
                  placeholder="Salary"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4 col-span-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="department"
                >
                  Select Department:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <select
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  name="department_name"
                  value={employeeDetails. department_name}
                  required
                  onChange={handleChange}
                >
                  <option value={employeeDetails.department}>{employeeDetails.department_name}</option>
                  {dep.length > 0
                    ? dep.map((item, index) => (
                        <option key={index} value={item.dep_name}>
                          {item.dep_name}
                        </option>
                      ))
                    : [
                        "tobe fetched from db",
                        "tobe fetched from db",
                        "tobe fetched from db",
                      ].map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                </select>
              </div>

              <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                Edit Employee Details
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default EditEmployee;

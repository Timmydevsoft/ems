import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const [dep, setDep] = useState([]);
  const [formD, setFormD] = useState({
    emp_name: "",
    mail: "",
    employee_id: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await axios.get(
          "https://ems-api-plum.vercel.app/api/departments",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const depsData = await response.data.departments.map((item) => {
          return { dep_name: item.dep_name, id: item._id };
        });
        setDep(depsData);
        console.log(dep);
      } catch (err) {
        console.log(err);
      }
    };
    getDepartment();
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormD((prev) => {
      return { ...prev, [name]: name === "image" ? files[0] : value };
    });
    console.log(formD);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData()
      
      Object.entries(formD).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      })
      
      // const formDataObj = new formData();
      // Object.keys(formData).forEach((key) => {
      //   formDataObj.append(key, formData[key]);
      // });
      const response = await axios.post(
        "https://ems-api-plum.vercel.app/api/employee/add",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 201) {
        navigate("/admin-dashboard/employees");
      } else {
        console.log(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-4xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-6">Add Department</h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cold-1 md:grid-cols-2 gap-4">
          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dep_name"
            >
              Name: <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="text"
              name="emp_name"
              placeholder="Enter Name"
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
              Email: <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="text"
              name="mail"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="employee_id"
            >
              Employee Id:{" "}
              <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="text"
              name="employee_id"
              placeholder="Enter emplyee Id"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="date_of_birth"
            >
              Date of Birth:{" "}
              <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="gender"
            >
              Gender: <span className="text-rose-500 font-bold text-xl">*</span>
            </label>

            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              name="gender"
              required
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
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
              placeholder="Designation"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="department"
            >
              Select Department:{" "}
              <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              name="department"
              required
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {dep.length > 0
                ? dep.map((item, index) => (
                    <option key={index} value={item.id}>
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

          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="dep_name"
            >
              Salary: <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              password:{" "}
              <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="*****"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700" htmlFor="role">
              Role: <span className="text-rose-500 font-bold text-xl">*</span>
            </label>

            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              name="role"
              required
              onChange={handleChange}
            >
              <option value="">Select Employee</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Upload Image:{" "}
              <span className="text-rose-500 font-bold text-xl">*</span>
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddEmployee;

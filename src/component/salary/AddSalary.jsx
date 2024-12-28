import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [dep, setDep] = useState([]);
  const [empError, setEmpError] = useState(false);
  const [salaryForm, setSalaryForm] = useState({
  
    id: "",
    basicSalary: 0,
    allowance: 0,
    deduction: 0,
    payDate: "",
  });
  const [employee, setEmployee] = useState([]);

  const handleDepartment = async (e) => {
    try {
      const response = await axios.get(
        `https://employee-management-api-xi.vercel.app/api/employee/department/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (!response.status === 200) {
        alert(response.data);
      }
      setEmployee(response.data);
      console.log(employee);
    } catch (err) {
      alert(err);
    }
  };
  // const handleEmployee = () => {
  //   if (employee.length === 0) {
  //     setEmpError(true);
  //   } else {
  //     setEmpError(false);
  //   }
  //   console.log(empError);
  // };

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await axios.get(
          "https://employee-management-api-xi.vercel.app/api/departments",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const depsData = response.data.departments.map((item) => {
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
    setSalaryForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(salaryForm);
    const selected = employee.filter((item)=> item.employeeId === salaryForm.id)[0]._id
    let data= {
      employeeId: selected,
      basicSalary: salaryForm.basicSalary,
      allowances: salaryForm.allowance,
      deduction: salaryForm.deduction,
      payDate: salaryForm.payDate
    }

    try {
      const res = await axios.post(
        "https://employee-management-api-xi.vercel.app/api/salary/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.status === 201) {
           navigate("/admin-dashboard/employees")
        }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {dep.length > 0 ? (
        <div className="max-w-4xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md">
          <h3 className="text-2xl font-bold mb-6">Add Salary</h3>

          <form onSubmit={handleSubmit}>
            {/* DEPARTMENT */}
            <div className="grid grid-cold-1 md:grid-cols-2 gap-4">
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
                  name="department_name"
                  required
                  onChange={handleDepartment}
                >
                  <option value="">--Select Department--</option>
                  {dep.length > 0
                    ? dep.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.dep_name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              {/* Employee */}
              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="id"
                >
                  Select Employee:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                {empError === true ? (
                  <span className="text-base text-rose-500 font-bold">
                    Select Department first
                  </span>
                ) : null}
                <select
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  name="id"
                  required
                  //   onClick={handleEmployee}
                  onChange={handleChange}
                  value={salaryForm.id}
                >
                  <option value="">Select Employee</option>
                  {dep.length > 0
                    ? employee.map((item, index) => {
                        return <option key={index}>{item.employeeId}</option>;
                      })
                    : null}
                </select>
              </div>

              {/* Basic Salary secetion */}
              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="dep_name"
                >
                  Basic Salary:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={salaryForm.basicSalary}
                  placeholder="Basic Salary"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              {/* Allowances */}
              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="dep_name"
                >
                  Allowances:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="number"
                  name="allowance"
                  placeholder="Allowance"
                  value={salaryForm.allowances}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="designation"
                >
                  Deductions:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="number"
                  name="deduction"
                  value={salaryForm.deduction}
                  placeholder="Deduction"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="paydate"
                >
                  Pay Date:{" "}
                  <span className="text-rose-500 font-bold text-xl">*</span>
                </label>
                <input
                  type="date"
                  name="payDate"
                  value={salaryForm.payDate}
                  placeholder="PayDate"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white col-span-2 font-bold py-2 px-4 rounded">
                Add Salary
              </button>
            </div>
          </form>
        </div>
      ) : (<div className="text-2xl text-teal-600 font-semibold">Loading....</div>)}
    </>
  );
};
export default AddSalary;

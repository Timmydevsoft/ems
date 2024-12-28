import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DataTable from "react-data-table-component";

import { useState } from "react";
import axios from "axios";
import { EmployeeButton, columns } from "../../util/EmployeeHelper";

const EmployeeList = () => {
  const { auth } = useAuth();
  const [employees, setemployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSorting = (id) => {
    setemployees((prev) => {
      return prev.filter((item) => item._id !== id);
    });
  };

  const handleFilter = () => {
    const newFilter = employees.filter((item) =>
      item.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(newFilter);
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        let s_no = 1;
        const response = await axios.get(
          "https://employee-management-api-xi.vercel.app/api/employees",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await response.data.map((item) => {
          return {
            _id: item._id,
            sno: s_no++,
            dep_name: item.department.dep_name,
            name: item.userId.name,
            dob: new Date(item.dob).toDateString(),
            profileImage: (
              <div className=" bg-slate-400 w-20 h-20 rounded-full">
                <img
                  className="h-full w-full rounded-full"
                  src={`https://employee-management-api-xi.vercel.app/${item.userId.profileImage}`}
                />
              </div>
            ),
            action: (
              <EmployeeButton id={item._id} handleSorting={handleSorting} />
            ),
          };
        });
        setemployees(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployees();
  }, []);
  // if(loading){
  //     return(<div className="text-3xl text-teal-500 font-bold">Loading.....</div>)
  // }

  return (
    <div className=" space-y-4 p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex items-center justify-between">
        <input
          onChange={handleFilter}
          type="text"
          placeholder="Search By Employee's Name"
          className="px-5 pt-0.5 h-10  border rounded text-white"
        />
        <Link
          className="px-4 py-1  bg-teal-600 font-bold rounded text-white"
          to="/admin-dashboard/add-employee"
        >
          Add New Employee
        </Link>
      </div>
      <div className="">
        <DataTable data={employees} columns={columns} pagination />
      </div>
    </div>
  );
};
export default EmployeeList;

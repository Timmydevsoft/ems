import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DataTable from "react-data-table-component";
import Loading from "../uiexperience/Loading";
import { columns, DepartmentButton } from "../../util/DepartmentHelper";
import { useState } from "react";
import axios from "axios";

const DepartmentList = () => {
  const { auth } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const handleSorting = (id) => {
    setDepartments((prev) => {
      return prev.filter((item) => item._id !== id);
    });
  };

  const handleFilter = () => {
    const newFilter = departments.filter((item) =>
      item.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(newFilter);
  };

  useEffect(() => {
    const getDepartment = async () => {
      try {
        let s_no = 1;
        const response = await axios.get(
          "https://ems-api-3nt7.onrender.com/api/departments",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await response.data.departments.map((item) => {
          return {
            _id: item._id,
            sno: s_no++,
            dep_name: item.dep_name,
            action: (
              <DepartmentButton id={item._id} handleSorting={handleSorting} />
            ),
          };
        });
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getDepartment();
  }, []);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" space-y-4 p-6 w-full overflow-x-hidden relative">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex flex-col-reverse gap-3 lg:flex-row items-center justify-between">
        <input
          onChange={handleFilter}
          type="text"
          placeholder="Search By Dep Name"
          className="px-5 pt-0.5 h-10 focus:outline-teal-500 border rounded text-white w-full"
        />
        <div className="flex justify-end w-full">
          <Link
            className="px-4 py-2  bg-teal-600 text-center font-bold rounded text-white"
            to="/admin-dashboard/add-department"
          >
            Add New Department
          </Link>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="w-[760px] lg:w-full p6 bg-red md:w-full">
          <DataTable 
             data={departments} 
             columns={columns} 
             className="w-[370px] md:w-full lg:w-full"
             pagination
         />
        </div>
      </div>
    </div>
  );
};
export default DepartmentList;

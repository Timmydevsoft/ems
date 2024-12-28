import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {ViewButtonLeave, leavesColumn } from "../../util/EmployeeHelper";
import DataTable from "react-data-table-component";

const AdminLeaveList = () => {
  const { auth } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const[tableData, setTableData]= useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getLeaves = async () => {
      try {
        const response = await axios.get("https://ems-api-plum.vercel.app/api/leave", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (response.status === 200) {
          let sno = 0;
          let data = await response.data.map((item) => {
            return {
              id: item._id,
              sno: sno++,
              name: item.employeeId.userId.name,
              employeeId: item.employeeId.employeeId,
              department: item.employeeId.department.dep_name,
              leaveType: item.leaveType,
              days:`${new Date(item.startDate).toLocaleDateString()} - ${ new Date(item.endDate).toLocaleDateString()}`,
              action: <ViewButtonLeave id={item._id} />,
              status: item.status,
            };
          });
          setLeaves(data);
          setTableData(data)
        }
      } catch (err) {
        alert(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getLeaves();
  }, []);

  const filterById = (e)=>{
    let value = e.target.value
    if(value  === ""){
      setTableData(leaves)
    }
    else{
      const filtered = tableData.filter((item)=> item.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
      if(filtered){
        setTableData(filtered)
      }
    }
  }

  const filterByStatus = (val)=>{
    const filtered = leaves.filter((item)=> item.status.toLowerCase().includes(val.toLowerCase()))
      if(filtered){
        setTableData(filtered)
      }
      
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search By Emp Id"
          onChange = {(e)=>filterById(e)}
          className="px-4 py-2 font-semibold border rounded"
        />
        <div className="space-x-3">
          {["Pending", "Approved", "Rejected"].map((item) => (
            <button
              key={item}
              onClick={()=>filterByStatus(item)}
              className="py-1 px-2 bg-teal-600 text-white hover:bg-teal-700"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-2xl text-teal-600 text-center">Loading .....</div>
      ) : (
       <div className="mt-3">
         <DataTable columns={leavesColumn} data={tableData} pagination />
       </div>
      )}
    </div>
  );
};
export default AdminLeaveList;

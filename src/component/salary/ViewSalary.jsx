import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    const getSalary = async () => {
      try {
        const salaryResponse = await axios.get(
          `https://ems-api-3nt7.onrender.com/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (salaryResponse.status === 200  && salaryResponse.data.length > 0) {
          setSalaries(salaryResponse.data);
        }
       
      } catch (err) {
        console.log(err);
      }
    };
    getSalary();
  }, []);

  let sno = 1;

  const fiterSalary = (e) => {
    const filteredSalary = salaries.filter((salary) =>
      salary._id.includes(e.target.value)
    );
    if (filteredSalary) {
      setSalaries(filteredSalary);
    } else {
      return false;
    }
  };
  return (
    <div className="overflow-x-auto  p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>
      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By Id"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={(e) => fiterSalary(e)}
        />
      </div>
      {salaries.length > 0 ? (
        <table className="w-full text-sm text-gray-500 text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            {[
              "SNO",
              "Emp Id",
              "Salary",
              "Allowance",
              "Deduction",
              "Total",
              "Pay Date"
            ].map((item) => {
              return (
                <th key={item} className="px-6 py-3">
                  {item}
                </th>
              );
            })}
          </thead>
          <tbody>
            {salaries.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{item.employeeId.employeeId}</td>
                  <td className="px-6 py-3">{item.basicSalary}</td>
                  <td className="px-6 py-3">{item.allowances}</td>
                  <td className="px-6 py-3">{item.deduction}</td>
                  <td className="px-6 py-3">{item.netSalary}</td>
                  <td className="px-6 py-3">
                    {new Date(item.payDate).toDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center w-full bg-white  h-14">
          <p className="text-center w-full font-bold">No Records</p>
        </div>
      )}
    </div>
  );
};
export default ViewSalary;

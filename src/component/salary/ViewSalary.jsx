import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../uiexperience/Loading";
const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
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
        if (salaryResponse.status === 200 && salaryResponse.data.length > 0) {
          setSalaries(salaryResponse.data);
          setLoading(false);
        }
      } catch (err) {
        alert(err.message);
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
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="p-5 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Salary History</h2>
      </div>
      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search By Id"
          className="border px-2 rounded-md py-1 outline-teal-500 border-gray-300 mb-4"
          onChange={(e) => fiterSalary(e)}
        />
      </div>
      <div className="overflow-x-scroll">
        {salaries.length > 0 ? (
          <table className="w-[750px] text-sm text-gray-500 md:w-full lg:w-full text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                {[
                  "SNO",
                  "Emp Id",
                  "Salary",
                  "Allowance",
                  "Deduction",
                  "Total",
                  "Pay Date",
                ].map((item) => {
                  return (
                    <th key={item} className="px-6 py-3">
                      {item}
                    </th>
                  );
                })}
              </tr>
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
    </div>
  );
};
export default ViewSalary;

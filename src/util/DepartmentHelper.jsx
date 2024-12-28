import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// import { windows } from "appjs"
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Departmen Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButton = ({ id, handleSorting }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://employee-management-api-xi.vercel.app/departments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        handleSorting(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items center space-x-9">
      <button
        onClick={() => navigate(`/admin-dashboard/departments/${id}`)}
        className="px-4 py-1 text-white text-base bg-teal-600 rounded-sm"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(id)}
        className="px-4 py-1 text-white text-base bg-red rounded-sm"
      >
        Delete
      </button>
    </div>
  );
};

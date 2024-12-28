import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Edit = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [dep, setDep] = useState({ dep_name: "", description: "" });
  const[loadind, setLoading] = useState(true)
  useEffect(() => {
    const getDeTtails = async () => {
      try {
        const response = await axios.get(
          `https://ems-api-plum.vercel.app/api/department/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
            },
          }
        );
        setDep( {dep_name: response.data.dep_name, description: response.data.description});
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    getDeTtails()
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDep((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.put(`https://ems-api-plum.vercel.app/api/departments/${id}`,
         dep,
         {
          headers:{
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${auth.token}`
          }
         }
        )
        if(res.status === 201){
          navigate("/admin-dashboard/departments")
        }
        else{
          navigate("/login")
        }
    }
    catch(err){
      navigate("/login")
      console.log(err)
    }

  }
  if(loadind){
    return(<p className="text-2xl text-teal-400 font-semibold">Loading...</p>)
  }

  return (
    <div className="max-w-3xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Edit Department</h3>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="dep_name"
          >
            Department Name:{" "}
            <span className="text-rose-500 font-bold text-xl">*</span>
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Dep Name"
            onChange={handleChange}
            value={dep.dep_name}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Add Description:{" "}
            <span className="text-rose-500 font-bold text-xl">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Add Description"
            onChange={handleChange}
            value={dep.description}
            className="block mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
          Edit Department
        </button>
      </form>
    </div>
  );
};
export default Edit;

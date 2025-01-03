import { useEffect, useRef, useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../component/uiexperience/Loading";
const Login = () => {
  const [user, setUser] = useState({ mail: "", password: "" });
  const inputRef = useRef()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: 200, message: "" });
  const { setAuth, auth } = useAuth();
  useEffect(
    ()=>{
        inputRef.current.focus()
    },[]
  )
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ status: 200, message: "" });
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setLoading(true)
        const response = await axios.post("https://ems-api-3nt7.onrender.com/api/login", user);
        if(response){
            setAuth({token: response.data.accessToken, userName: response.data.name, role: response.data.role, id: response.data.id})

            //concept learned from Dave
            /*if(response){
                navigate(from, {replace: true});
            }*/
            if(response.data.accessToken && response.data.role === "admin"){
                setLoading(false)
                navigate("/admin-dashboard")
            }
            else if(response.data.accessToken && response.data.role === "Employee"){
                setLoading(false)
                navigate("/employee-dashboard")
            }
        }
    }
    catch(err){
        if(err.status === 401){
            setLoading(false)
            setError(prev=>{
                return({...prev, status:401, message: "Invalid or wrong password"})
            })
        }
        else{
            alert(err.message)
            setLoading(false)
        }

    }
  };
  return (
    <div className="flex p-6 lg:p-0 flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="text-3xl text-white Sevillana text-center">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="text-rose-500">
            {error.status === 200 ? "" : error.message}
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              name="mail"
              ref={inputRef}
              placeholder="Enter your mail"
              value={user.mail}
              onChange={handleChange}
              className="px-3 py-2 w-full border focus:outline-teal-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passsword" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="******"
              value={user.password}
              onChange={(e) => handleChange(e)}
              className="px-3 py-2 w-full border focus:outline-teal-400"
            />
          </div>
          <div className="flex items-ceter w-full justify-center mb-4">
            <div className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me </span>
            </div>

            <a href="" className="text-teal-600">
              {" "}
              Forgot Password?
            </a>
          </div>
          <div className="mb-4">
            <div className={`w-full flex justify-center ${loading? 'border-2': 'border-none'}`}>
              {loading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [settingsData, setSettingsData] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (settingsData.newPassword !== settingsData.confirmPassword) {
      console.log(settingsData);
      return setError("Password does not match");
    } else {
      setError("");
      try {
        let id = auth.id;
        const response = await axios.put(
          "http://localhost:3000/api/settings",
          { ...settingsData, id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
    
        if (response.status === 201) {
          
          if(auth.role === "Employee"){
            navigate("/employee-dashboard");
          }
          else{
            navigate("/admin-dashboard")
          }
          
        }
      } catch (err) { 
        alert(error);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsData((prev) => {
      return { ...prev, [name]: value };
    });
    if (setSettingsData.newPassword !== setSettingsData.confirmPassword) {
      setError("New passord does not match");
    } else {
      setError("");
    }
  };

  return (
    <div className="max-w-3xl mt-10 mx-auto bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-rose-500">{error}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="text-sm fonr-medium text-gray-700">
            Old Password
          </label>
          <br />
          <input
            type="password"
            name="oldPassword"
            placeholder="Change Password"
            className="w-full mt-1 p-2 border rounded-md"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="text-sm fonr-medium text-gray-700">
            New Password
          </label>
          <br />
          <input
            type="password"
            name="newPassword"
            placeholder="Change Password"
            className="w-full mt-1 p-2 border rounded-md"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="text-sm fonr-medium text-gray-700">
            Confirm Password
          </label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Change Password"
            className="w-full mt-1 p-2 border rounded-md"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="mt-6 w-full bg-teal-600 rounded-md py-2 text-white font-semibold hover:bg-teal-800">
          Update Password
        </button>
      </form>
    </div>
  );
};
export default Setting;

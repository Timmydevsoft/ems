import { NavLink, Link} from "react-router-dom";
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers} from "react-icons/fa"
import { useAuth } from "../../context/AuthContext";
const AdminSideBar = () => {
    const{auth, handleMenu}=useAuth()
   
  return (
    <div className={`absolute ${auth.menu ? 'left-0':'-left-72'}  bg-gray-800 text-white lg:fixed h-screen lg:left-0 top-0 bottom-0 space-y-2 w-64 z-50`}>
      <div className="flex items-center justify-center bg-teal-600 h-12">
        <h2 className="font-pacific text-2xl text-center">Employee MS</h2>{/* needs to adjust the font to that of google*/ }
      </div>
      <div className="px-4 space-y-2">
        {
            [
                {
                    name: "Dashboard",
                    icon: FaTachometerAlt,
                    to: "/admin-dashboard"
                },
                {
                    name: "Employee",
                    to: "/admin-dashboard/employees",
                    icon: FaUsers
                },
                {
                    name: "Department",
                    icon: FaBuilding,
                    to: "/admin-dashboard/departments"
                },
                {
                    name: "Leave",
                    icon: FaCalendarAlt,
                    to: "/admin-dashboard/leaves"
                },
                {
                    name: "Salary",
                    icon: FaMoneyBillWave,
                    to: "/admin-dashboard/salary"
                },
                {
                    name: "Setting",
                    icon: FaCogs,
                    to: "/admin-dashboard/setting"
                }
            ].map((item)=>{
                return(
                    <NavLink 
                        key={item.name}
                        to={item.to}
                        onClick={handleMenu}
                        className={({isActive})=>`${isActive? 'bg-teal-500': 'bg-none'} flex item-center space-x-4 py-2.5 px-4 rounded`}
                        end
                    >
                        <item.icon className="block mt-1"/>
                        <span>{item.name}</span>
                    </NavLink>
                )
            })
        }
       
      </div>
    </div>
  );
};
export default AdminSideBar;

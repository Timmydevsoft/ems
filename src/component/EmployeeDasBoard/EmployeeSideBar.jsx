import { NavLink, Link} from "react-router-dom";
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers} from "react-icons/fa"
import { useAuth } from "../../context/AuthContext";
import "../../index.css"
const EmployeeSideBar = () => {
    const{auth, handleMenu}= useAuth()
    
  return (
    <div className={`absolute ${auth.menu ? 'left-0':'-left-72'}  bg-gray-800 text-white lg:fixed h-screen lg:left-0 top-0 bottom-0 space-y-2 w-64`}>
      <div className="flex items-center justify-center bg-teal-600 h-12">
        <h2 className="font-pacific text-2xl text-center Sevillana">Employee MS</h2>{/* needs to adjust the font to that of google*/ }
      </div>
      <div className="px-4 space-y-2">
        {
            [
                {
                    name: "Dashboard",
                    icon: FaTachometerAlt,
                    to: "/employee-dashboard"
                },
                {
                    name: "My Profile",
                    to: "/employee-dashboard/profile",
                    icon: FaUsers
                },
                {
                    name: "Leaves",
                    icon: FaBuilding,
                    to: `/employee-dashboard/leave/${auth.id}`
                },
                {
                    name: "Salary",
                    icon: FaMoneyBillWave,
                    to: `/employee-dashboard/salary/${auth.id}`
                },
                {
                    name: "Settings",
                    icon: FaCogs,
                    to: "/employee-dashboard/settings"
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
export default EmployeeSideBar

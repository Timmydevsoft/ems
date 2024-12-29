import { useAuth } from "../../context/AuthContext";
import hamburger from "../../assets/icon-menu.svg";
import { useState } from "react";
const NavBar = () => {
  const { auth, logOut, setAuth } = useAuth();

  const handleMenu = () => {
   setAuth((prev)=>{
    return({...prev, menu: !auth.menu})
   })
  };
  const[showLogout, setShowLogout]=useState(false)
  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
      <p>Welcome, {auth.userName}</p>
      <div className="flex items-center space-x-2 relative">

        <button className="lg:hidden" onClick={handleMenu}>
          {auth.menu ? 
             (
               <div className="flex lg:hidden">
                    <span className="w-6 h-1 bg-white transform translate-x-6 rotate-45"></span>
                    <span className="w-6 h-1 bg-white transform -rotate-45"></span>
                </div>
               ) : 
               (
                <img src={hamburger} alt="hamburger icon" />
               )
            }
        </button>

        <div className="flex lg:hidden" onClick={()=>setShowLogout(prev=>!prev)}>
          <span className={`w-4 h-1 bg-white transform translate-x-2  ${showLogout ? "-rotate-45" : "rotate-45"}`}></span>
          <span className={`w-4 h-1 bg-white transform rotate-45 ${showLogout ? "rotate-45" : "-rotate-45"}`}></span>
        </div>

        <div className={`absolute ${showLogout ? "block" : "hidden"} lg:hidden top-10 -right-4 lg:-top-4`} >
          <button
            onClick={() => logOut()}
            className="w-20 py-1 bg-teal-700 hover:bg-teal-800 min-w-fit"
          >
            Log out
          </button>
        </div>
        <button
          onClick={() => logOut()}
          className="hidden lg:inline px-4 py-1 bg-teal-700 hover:bg-teal-800 "
        >
          Log out
        </button>
      </div>
    </div>
  );
};
export default NavBar;

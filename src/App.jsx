import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import RequiredAuth from "./component/admin/RequiredAuth";
import AdminSummary from "./component/admin/AdminSummary";
import DepartmentList from "./component/department/DepartmentList";
import AddDepartment from "./component/department/AddDepartment";
import Edit from "./component/department/Edit";
import EmployeeList from "./component/employee/EmployeeList"
import AddEmployee from "./component/employee/AddEmployee";
import View from "./component/employee/View";
import EditEmployee from "./component/employee/EditEmployee";
import AddSalary from "./component/salary/AddSalary";
import ViewSalary from "./component/salary/ViewSalary";
import EmployeeSummary from "./component/EmployeeDasBoard/EmployeeSummary";
import EmployeeProfile from "./component/EmployeeDasBoard/EmployeeProfile";
import LeaveList from "./component/leaves/LeaveList";
import AddNewLeave from "./component/leaves/AddNewLeave";
import Setting from "./component/EmployeeDasBoard/Setting";
import AdminLeaveList from "./component/admin/AdminLeaveList";
import AdminLeaveView from "./component/admin/AdminLeaveView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<RequiredAuth />}>
          <Route path="/admin-dashboard" element={<AdminDashBoard />}>
            <Route index element={<AdminSummary/>}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/admin-dashboard/departments/:id" element={<Edit/>}></Route>
            <Route path="/admin-dashboard/employees" element={<EmployeeList/>}></Route>
            <Route path="/admin-dashboard/employee/:id" element={<View/>}></Route>
            <Route path="/admin-dashboard/employee/edit/:id" element={<EditEmployee/>}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
            <Route path="/admin-dashboard/salary" element={<AddSalary/>}></Route>
            <Route path="/admin-dashboard/leaves" element={<AdminLeaveList/>}></Route>
            <Route path="/admin-dashboard/leave/:id" element={<AdminLeaveView/>}></Route>
            <Route path="/admin-dashboard/employees/leave/:id" element={<LeaveList/>}></Route>
            <Route path="/admin-dashboard/setting" element={<Setting/>}></Route>
    
          </Route>
          {/* */}
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} >
           <Route index element={<EmployeeSummary/>}></Route>
           <Route path="/employee-dashboard/profile" element={<EmployeeProfile/>}></Route>
           <Route path="/employee-dashboard/leave/:id" element={<LeaveList/>}></Route>
           <Route path="/employee-dashboard/add-leave" element={<AddNewLeave/>}></Route>
           <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
           <Route path="/employee-dashboard/settings" element={<Setting/>}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import AdminFooter from "../components/admin/Footer"
import AdminHeader from "../components/admin/Header"
import AdminSidebar from "../components/admin/Sidebar"
import Admin_Page_Router from "./Admin_Route"

const Admin_layout=()=>{
  return(
    <>
    <AdminHeader/>

<div className="w-full flex">
  <div className="w-[30%]">
    <AdminSidebar/>
  </div>
  <div className="flex-1">
    <Admin_Page_Router/>
  </div>
</div>

    <AdminFooter/>
    
    
    </>
  )
}

export default Admin_layout
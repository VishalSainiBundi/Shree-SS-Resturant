import { Routes, Route } from "react-router-dom";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";
import AddDish from "./add_Dish";
import AdminDishes from "./Showdish";
import ShowCategory from "./showCategory";
import AddCategory from "./addCategory";
import AddTable from "./add_table";
import AdminTables from "./showTable";


const Admin_Page_Router = () => {
  return (
    <Routes>
       <Route index element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/add-dish" element={<AddDish />} />
      <Route path="/dishes" element={<AdminDishes />} />
      <Route path="/categories" element={<ShowCategory />} />
      <Route path="/category/add" element={<AddCategory />} />
      <Route path="/tables" element={<AdminTables />} />
      <Route path="/table/add" element={<AddTable />} />
  
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} /> */}
    </Routes>
  );
};

export default Admin_Page_Router
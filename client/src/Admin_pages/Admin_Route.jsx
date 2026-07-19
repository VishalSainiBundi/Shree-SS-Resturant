import { Routes, Route } from "react-router-dom";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";
import AddDish from "./add_Dish";
import AdminDishes from "./Showdish";
import ShowCategory from "./showCategory";
import AddCategory from "./addCategory";


const Admin_Page_Router = () => {
  return (
    <Routes>
       <Route index element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/add-dish" element={<AddDish />} />
      <Route path="/dishes" element={<AdminDishes />} />
      <Route path="/categories" element={<ShowCategory />} />
      <Route path="/category/add" element={<AddCategory />} />
  
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} /> */}
    </Routes>
  );
};

export default Admin_Page_Router
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";
import AddDish from "./add_Dish";
import AdminDishes from "./Showdish";
import ShowCategory from "./showCategory";
import AddCategory from "./addCategory";
import AddTable from "./add_table";
import AdminTables from "./showTable";
import { useEffect, useState } from "react";
import get_Reserve from "../../api_calls/getReserv";
import AdminReservations from "./showReserv";
import getOrder from "../../api_calls/getOrder";
import AdminOrders from "./showOrders";


const Admin_Page_Router = () => {

  const [Reserv, setReserv]= useState([])
  const [Order, setOrder]= useState([])

useEffect(
  ()=>{
    const fetchData=async ()=>{

const reserv= await get_Reserve()
const order = await getOrder()


setReserv(reserv)
setOrder(order)
    } 
  fetchData()
  },[]
  
)
// console.log(Reserv,"AdminReserv")
// console.log(Order,"orderData")


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
      <Route path="/reservations" element={<AdminReservations reserving= {Reserv} />} />
      <Route path="/orders" element={<AdminOrders orders= {Order} />} />
  
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} /> */}
    </Routes>
  );
};

export default Admin_Page_Router
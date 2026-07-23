import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./Pages/about";
import Contact from "./Pages/contact";
import Gallery from "./Pages/gallery";
import AuthPage from "./Pages/register";
import { useEffect, useState } from "react";
import Get_dish from "../api_calls/getDish";
import GetMenu from "../api_calls/getMenu";
import ViewCategoryDishes from "./Pages/view";
import DishDetail from "./components/dishDetal"
import OrderConfirmed from "./components/orderConfirmed";
import BookTable from "./Pages/reservTable";


const Page_Router =() => {

const [dish, setdish]= useState([])
const [category, setcategory]= useState([])

useEffect(
  ()=>{
   const fetchDish=async ()=>{
    const data= await Get_dish()
    const catdata= await GetMenu()
    setcategory(catdata.data)
    setdish(data.data)
   }
   fetchDish()
  },[]
)

// console.log(category)

  return (
    <Routes>
      <Route path="/" element={<Home dish={dish} category={category}/>} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/view/:id" element={<ViewCategoryDishes  dish={dish} category={category}/>} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/order-confired" element={<OrderConfirmed />} />
      <Route path="/reserv_table" element={<BookTable />} />
      <Route path="/dishDetail/:id" element={<DishDetail  dishData={dish} category={category} />} />
    </Routes>
  );
};

export default Page_Router;
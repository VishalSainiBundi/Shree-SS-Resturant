import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./Pages/about";
import Contact from "./Pages/contact";
import Gallery from "./Pages/gallery";
import AuthPage from "./Pages/register";
import { useEffect, useState } from "react";
import Get_dish from "../api_calls/getDish";
// import About from "./components/About";
// import Contact from "./components/Contact";

const Page_Router =() => {

const [dish, setdish]= useState([])

useEffect(
  ()=>{
   const fetchDish=async ()=>{
    const data= await Get_dish()
    setdish(data.data)
   }
   fetchDish()
  },[]
)

  return (
    <Routes>
      <Route path="/" element={<Home dish={dish} />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default Page_Router;
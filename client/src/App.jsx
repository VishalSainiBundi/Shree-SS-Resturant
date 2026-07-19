import { Routes, Route } from "react-router-dom";

import Page_layout from "./Pages/layout";
import Admin_layout from "./Admin_pages/Admin_layout";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<Page_layout />} />
      <Route path="/admin/*" element={<Admin_layout/>} />
    </Routes>
  );
}

export default App;
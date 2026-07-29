// import { useEffect, useState } from "react";
// import GetMenu from "../../api_calls/getMenu";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Page_Router from "../Router";

// const Page_layout = () => {
//   const [menuData, setMenuData] = useState([]);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const data = await GetMenu();
//         // API returns { success: true, data: [...] } — extract the array
//         if (data?.success && Array.isArray(data.data)) {
//           setMenuData(data.data);
//         } else {
//           console.error("Unexpected menu response shape:", data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMenu();
//   }, []);

//   // console.log(menuData)
//   return (
//     <>
//       <Header menu_data={menuData} />
      
//       <Page_Router />
//       <Footer />
//     </>
//   );
// };

// export default Page_layout;


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";

import GetMenu from "../../api_calls/getMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page_Router from "../Router";

const Page_layout = () => {
  const [menuData, setMenuData] = useState([]);
  const dispatch = useDispatch();

  // Restore user after refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await GetMenu();

        if (data?.success && Array.isArray(data.data)) {
          setMenuData(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <Header menu_data={menuData} />
      <Page_Router />
      <Footer />
    </>
  );
};

export default Page_layout;
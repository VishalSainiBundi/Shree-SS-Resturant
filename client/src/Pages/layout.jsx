import { useEffect, useState } from "react";
import GetMenu from "../../api_calls/getMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page_Router from "../Router";

const Page_layout = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await GetMenu();
        setMenuData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenu();
  }, []);

  // console.log(menuData)
  return (
    <>
      <Header menu_data={menuData} />
      
      <Page_Router />
      <Footer />
    </>
  );
};

export default Page_layout;
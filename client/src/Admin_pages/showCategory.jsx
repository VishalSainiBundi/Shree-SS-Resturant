import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Utensils,
  ImageIcon,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import axiosApiInstance from "../../helper";
import DeleteBtn from "../components/deleteBtn";


const ShowCategory = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const getCategories = async () => {

    try {

      setLoading(true);

      const res = await axiosApiInstance.get("/menu/get");

      setCategories(res.data.data || []);

    } catch (error) {

      console.log(error);
      alert("Failed to load categories");

    } finally {

      setLoading(false);

    }
  };


  useEffect(()=>{
    getCategories();
  },[]);



  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">


      <div className="max-w-7xl mx-auto">


        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-10">


          <div>

            <h1 className="text-4xl font-black text-orange-600 flex items-center gap-3">

              <Utensils size={40}/>

              Menu Categories

            </h1>


            <p className="text-gray-500 mt-2">

              Manage restaurant food categories

            </p>

          </div>



          <Link

            to="/admin/category/add"

            className="
            flex items-center gap-2
            bg-gradient-to-r from-orange-500 to-red-500
            text-white px-6 py-3
            rounded-xl font-bold
            shadow-lg hover:scale-105
            transition
            "

          >

            <Plus size={20}/>

            Add Category

          </Link>


        </div>



        {/* Count Card */}


        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


          <h3 className="text-gray-500">

            Total Categories

          </h3>


          <p className="text-4xl font-black text-orange-600 mt-2">

            {categories.length}

          </p>


        </div>




        {/* Loading */}


        {loading && (

          <div className="text-center py-20">

            <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"/>

            <p className="mt-4 text-gray-500">
              Loading categories...
            </p>

          </div>

        )}




        {/* Empty */}


        {!loading && categories.length === 0 && (

          <div className="
          bg-white rounded-3xl
          shadow-xl
          p-16
          text-center
          ">


            <ImageIcon
              size={70}
              className="mx-auto text-orange-400"
            />


            <h2 className="text-2xl font-bold mt-5">

              No Category Found

            </h2>


            <p className="text-gray-500 mt-2">

              Add your first restaurant category

            </p>


          </div>

        )}






        {/* Cards */}


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">


          {!loading && categories.map((item,index)=>(


            <div

              key={item._id}

              className="
              bg-white
              rounded-3xl
              shadow-xl
              overflow-hidden
              hover:-translate-y-2
              transition
              duration-300
              "

            >



              {/* Image */}

              <div className="h-52 overflow-hidden">


                <img

                  src={item.image}

                  alt={item.sub}

                  className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-110
                  transition
                  duration-500
                  "

                />


              </div>




              <div className="p-6">



                <span className="
                bg-orange-100
                text-orange-600
                px-4 py-1
                rounded-full
                text-sm
                font-semibold
                ">

                  {item.main}

                </span>



                <h2 className="text-2xl font-bold mt-4">

                  {item.sub}

                </h2>





                <div className="flex justify-between items-center mt-5">


                  {

                  item.status ?

                  <span className="
                  flex items-center gap-2
                  text-green-600
                  bg-green-100
                  px-3 py-2
                  rounded-lg
                  text-sm
                  font-semibold
                  ">

                    <CheckCircle size={16}/>

                    Active

                  </span>


                  :

                  <span className="
                  flex items-center gap-2
                  text-red-600
                  bg-red-100
                  px-3 py-2
                  rounded-lg
                  text-sm
                  font-semibold
                  ">

                    <XCircle size={16}/>

                    InActive

                  </span>


                  }



                  <DeleteBtn

                    id={item._id}

                    url="/menu/"

                    onDelete={getCategories}

                  />


                </div>



              </div>



            </div>


          ))}


        </div>


      </div>


    </div>

  );

};


export default ShowCategory;
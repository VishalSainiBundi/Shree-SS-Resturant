// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Plus,
//   Utensils,
//   ImageIcon,
//   Trash2,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// import axiosApiInstance from "../../helper";
// import DeleteBtn from "../components/deleteBtn";


// const ShowCategory = () => {

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const getCategories = async () => {

//     try {

//       setLoading(true);

//       const res = await axiosApiInstance.get("/menu/get");

//       setCategories(res.data.data || []);

//     } catch (error) {

//       console.log(error);
//       alert("Failed to load categories");

//     } finally {

//       setLoading(false);

//     }
//   };


//   useEffect(()=>{
//     getCategories();
//   },[]);



//   return (

//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">


//       <div className="max-w-7xl mx-auto">


//         {/* Header */}

//         <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-10">


//           <div>

//             <h1 className="text-4xl font-black text-orange-600 flex items-center gap-3">

//               <Utensils size={40}/>

//               Menu Categories

//             </h1>


//             <p className="text-gray-500 mt-2">

//               Manage restaurant food categories

//             </p>

//           </div>



//           <Link

//             to="/admin/category/add"

//             className="
//             flex items-center gap-2
//             bg-gradient-to-r from-orange-500 to-red-500
//             text-white px-6 py-3
//             rounded-xl font-bold
//             shadow-lg hover:scale-105
//             transition
//             "

//           >

//             <Plus size={20}/>

//             Add Category

//           </Link>


//         </div>



//         {/* Count Card */}


//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">


//           <h3 className="text-gray-500">

//             Total Categories

//           </h3>


//           <p className="text-4xl font-black text-orange-600 mt-2">

//             {categories.length}

//           </p>


//         </div>




//         {/* Loading */}


//         {loading && (

//           <div className="text-center py-20">

//             <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"/>

//             <p className="mt-4 text-gray-500">
//               Loading categories...
//             </p>

//           </div>

//         )}




//         {/* Empty */}


//         {!loading && categories.length === 0 && (

//           <div className="
//           bg-white rounded-3xl
//           shadow-xl
//           p-16
//           text-center
//           ">


//             <ImageIcon
//               size={70}
//               className="mx-auto text-orange-400"
//             />


//             <h2 className="text-2xl font-bold mt-5">

//               No Category Found

//             </h2>


//             <p className="text-gray-500 mt-2">

//               Add your first restaurant category

//             </p>


//           </div>

//         )}






//         {/* Cards */}


//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">


//           {!loading && categories.map((item,index)=>(


//             <div

//               key={item._id}

//               className="
//               bg-white
//               rounded-3xl
//               shadow-xl
//               overflow-hidden
//               hover:-translate-y-2
//               transition
//               duration-300
//               "

//             >



//               {/* Image */}

//               <div className="h-52 overflow-hidden">


//                 <img

//                   src={item.image}

//                   alt={item.sub}

//                   className="
//                   w-full
//                   h-full
//                   object-cover
//                   hover:scale-110
//                   transition
//                   duration-500
//                   "

//                 />


//               </div>




//               <div className="p-6">



//                 <span className="
//                 bg-orange-100
//                 text-orange-600
//                 px-4 py-1
//                 rounded-full
//                 text-sm
//                 font-semibold
//                 ">

//                   {item.main}

//                 </span>



//                 <h2 className="text-2xl font-bold mt-4">

//                   {item.sub}

//                 </h2>





//                 <div className="flex justify-between items-center mt-5">


//                   {

//                   item.status ?

//                   <span className="
//                   flex items-center gap-2
//                   text-green-600
//                   bg-green-100
//                   px-3 py-2
//                   rounded-lg
//                   text-sm
//                   font-semibold
//                   ">

//                     <CheckCircle size={16}/>

//                     Active

//                   </span>


//                   :

//                   <span className="
//                   flex items-center gap-2
//                   text-red-600
//                   bg-red-100
//                   px-3 py-2
//                   rounded-lg
//                   text-sm
//                   font-semibold
//                   ">

//                     <XCircle size={16}/>

//                     InActive

//                   </span>


//                   }



//                   <DeleteBtn

//                     id={item._id}

//                     url="/menu/"

//                     onDelete={getCategories}

//                   />


//                 </div>



//               </div>



//             </div>


//           ))}


//         </div>


//       </div>


//     </div>

//   );

// };


// export default ShowCategory;



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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating cream particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-300/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-amber-400 text-2xl">✦</span>
              <h1 className="text-4xl font-serif font-bold text-amber-800 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Utensils size={24} className="text-white" />
                  </div>
                </div>
                Menu Categories
              </h1>
              <span className="text-amber-400 text-2xl">✦</span>
            </div>
            <p className="text-amber-600/60 font-light ml-1">
              Manage restaurant food categories
            </p>
          </div>

          <Link
            to="/admin/category/add"
            className="relative group/btn overflow-hidden rounded-xl px-6 py-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex items-center gap-2 text-white font-serif tracking-wide">
              <Plus size={20} />
              Add Category
            </div>
          </Link>
        </div>

        {/* Count Card */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-200/20 p-6 border border-amber-200/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-[0.1em]">
                  Total Categories
                </p>
                <p className="text-4xl font-serif font-bold text-amber-800 mt-2">
                  {categories.length}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100/80 to-yellow-100/80 rounded-2xl flex items-center justify-center border border-amber-200/50">
                <Utensils size={32} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-amber-600/60 font-light">Loading categories...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && categories.length === 0 && (
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-3xl blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/20 p-20 text-center border border-amber-200/30">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl"></div>
                <ImageIcon size={80} className="mx-auto text-amber-300 relative z-10" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-amber-800 mt-6">
                No Category Found
              </h2>
              <p className="text-amber-600/60 font-light mt-2">
                Add your first restaurant category to get started
              </p>
              <Link
                to="/admin/category/add"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-serif hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                <Plus size={20} />
                Add First Category
              </Link>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            categories.map((item, index) => (
              <div
                key={item._id}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-200/20 hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-300 overflow-hidden border border-amber-200/30 hover:-translate-y-2">
                  {/* Image */}
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.sub}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none"></div>
                    
                    {/* Status badge on image */}
                    <div className="absolute top-4 right-4">
                      {item.status ? (
                        <span className="flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          <CheckCircle size={14} />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          <XCircle size={14} />
                          InActive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-amber-100/80 text-amber-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-200/50">
                        {item.main}
                      </span>
                      <span className="text-[10px] text-amber-400/40 font-light tracking-wider uppercase">
                        #{String(index + 1).padStart(3, '0')}
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-amber-800">
                      {item.sub}
                    </h2>

                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-amber-200/30">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <span className="text-amber-300/40 text-xs">★</span>
                      </div>

                      <DeleteBtn
                        id={item._id}
                        url="/menu/"
                        onDelete={getCategories}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-10 mt-6 border-t border-amber-200/20">
          <div className="flex justify-center items-center gap-3">
            <span className="text-amber-300/40 text-xs">◆</span>
            <p className="text-[10px] text-amber-500/40 font-light tracking-[0.2em] uppercase">
              SHREE SS RESTAURANT · Taste that stays in your heart ❤️
            </p>
            <span className="text-amber-300/40 text-xs">◆</span>
          </div>
          <p className="text-[10px] text-amber-400/30 mt-1 tracking-wider">
            {categories.length} Categories • Premium Dining Experience
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default ShowCategory;
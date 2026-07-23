import { useState } from "react";
// import axiosApiInstance from "../../helper"; // Update path if needed
import axios from 'axios'

const AddTable = () => {
  const [formData, setFormData] = useState({
    tableNo: "",
    category: "",
    capecity: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        tableNo: formData.tableNo,
        category: formData.category,
        capecity: Number(formData.capecity),
        price: Number(formData.price),
      };

      const res = await axios.post("http://localhost:5000/add_table/create", payload);

      if (res.data.flag === 0) {
        alert(res.data.msg);

        setFormData({
          tableNo: "",
          category: "",
          capecity: "",
          price: "",
        });
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Add Restaurant Table
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold block mb-2">
              Table Number
            </label>

            <input
              type="text"
              name="tableNo"
              value={formData.tableNo}
              onChange={handleChange}
              placeholder="R-01"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select</option>
              <option value="Royal Dining">Royal Dining</option>
              <option value="Business Dining">Business Dining</option>
              <option value="Classic Dining">Classic Dining</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Capacity
            </label>

            <input
              type="number"
              name="capecity"
              value={formData.capecity}
              onChange={handleChange}
              placeholder="4"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Booking Price (₹)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1500"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Saving..." : "Add Table"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTable;




// import { useState } from "react";
// import axios from 'axios'

// const AddTable = () => {
//   const [formData, setFormData] = useState({
//     tableNo: "",
//     category: "",
//     capecity: "",
//     price: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ Fixed: Better event handling with proper value extraction
//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
    
//     // For number inputs, ensure we're handling them correctly
//     if (type === 'number') {
//       setFormData({
//         ...formData,
//         [name]: value === '' ? '' : Number(value),
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   // ✅ Fixed: Select change handler specifically for better compatibility
//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Validation: Check if all fields are filled
//     if (!formData.tableNo || !formData.category || !formData.capecity || !formData.price) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         tableNo: formData.tableNo,
//         category: formData.category,
//         capecity: Number(formData.capecity),
//         price: Number(formData.price),
//       };

//       const res = await axios.post("http://localhost:5000/add_table/create", payload);

//       if (res.data.flag === 0) {
//         alert(res.data.msg);

//         setFormData({
//           tableNo: "",
//           category: "",
//           capecity: "",
//           price: "",
//         });
//       } else {
//         alert(res.data.msg);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50 flex justify-center items-center p-6 relative overflow-hidden">
//       {/* Cream decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl"></div>
//       </div>

//       {/* Floating cream particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animation: `float ${4 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 3}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative w-full max-w-2xl z-10">
//         {/* Premium decorative frame */}
//         <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-[2.5rem] blur-sm"></div>
//         <div className="absolute -inset-2 bg-gradient-to-r from-amber-300/30 via-yellow-300/30 to-amber-300/30 rounded-[2rem]"></div>

//         <div className="relative bg-gradient-to-br from-cream-50/95 via-white/95 to-amber-50/95 backdrop-blur-xl rounded-3xl p-10 border border-amber-200/60 shadow-2xl shadow-amber-200/30">
          
//           {/* Ornate gold corner decorations */}
//           <div className="absolute -top-1 -left-1 w-16 h-16">
//             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-300/80 rounded-tl-lg"></div>
//             <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-amber-200/60 rounded-tl-md"></div>
//           </div>
//           <div className="absolute -top-1 -right-1 w-16 h-16">
//             <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-300/80 rounded-tr-lg"></div>
//             <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-amber-200/60 rounded-tr-md"></div>
//           </div>
//           <div className="absolute -bottom-1 -left-1 w-16 h-16">
//             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-300/80 rounded-bl-lg"></div>
//             <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-amber-200/60 rounded-bl-md"></div>
//           </div>
//           <div className="absolute -bottom-1 -right-1 w-16 h-16">
//             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-300/80 rounded-br-lg"></div>
//             <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-amber-200/60 rounded-br-md"></div>
//           </div>

//           {/* Header Section */}
//           <div className="text-center mb-10 relative">
//             <div className="flex justify-center items-center gap-6 mb-4">
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
//               <div className="relative">
//                 <span className="text-4xl text-amber-400">✦</span>
//                 <span className="absolute inset-0 text-4xl text-amber-300/50 blur-sm animate-pulse">✦</span>
//               </div>
//               <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
//             </div>
            
//             <h1 className="text-5xl font-serif font-bold text-amber-800 tracking-wider">
//               Royal Table
//             </h1>
//             <p className="text-amber-600/70 font-light tracking-[0.3em] uppercase text-xs mt-2">
//               Five Star Gastronomic Excellence
//             </p>
            
//             {/* Animated rating stars */}
//             <div className="flex justify-center gap-2 mt-4">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className="text-amber-400 text-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
//                   ★
//                 </span>
//               ))}
//             </div>

//             {/* Decorative divider */}
//             <div className="flex justify-center items-center gap-4 mt-6">
//               <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-amber-300/40"></div>
//               <span className="text-amber-300/40 text-xs">◆</span>
//               <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-amber-300/40"></div>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="group">
//               <label className="font-light text-amber-700/80 block mb-2 text-xs tracking-[0.2em] uppercase flex items-center gap-2">
//                 <span className="w-1 h-1 bg-amber-400/60 rounded-full"></span>
//                 Table Number
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70 font-serif text-xl">#</span>
//                 <input
//                   type="text"
//                   name="tableNo"
//                   value={formData.tableNo}
//                   onChange={handleChange}
//                   placeholder="Enter royal table number"
//                   required
//                   className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-3.5 pl-10 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             </div>

//             <div className="group">
//               <label className="font-light text-amber-700/80 block mb-2 text-xs tracking-[0.2em] uppercase flex items-center gap-2">
//                 <span className="w-1 h-1 bg-amber-400/60 rounded-full"></span>
//                 Dining Category
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70">⌘</span>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleSelectChange}
//                   className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-3.5 pl-10 outline-none text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 appearance-none cursor-pointer"
//                 >
//                   <option value="">Select prestigious category</option>
//                   <option value="Royal Dining">👑 Royal Dining</option>
//                   <option value="Business Dining">💼 Executive Dining</option>
//                   <option value="Classic Dining">🍽️ Classic Elegance</option>
//                 </select>
//                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/60">▾</span>
//                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             </div>

//             <div className="group">
//               <label className="font-light text-amber-700/80 block mb-2 text-xs tracking-[0.2em] uppercase flex items-center gap-2">
//                 <span className="w-1 h-1 bg-amber-400/60 rounded-full"></span>
//                 Guest Capacity
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70">👥</span>
//                 <input
//                   type="number"
//                   name="capecity"
//                   value={formData.capecity}
//                   onChange={handleChange}
//                   placeholder="Number of distinguished guests"
//                   required
//                   min="1"
//                   className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-3.5 pl-10 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             </div>

//             <div className="group">
//               <label className="font-light text-amber-700/80 block mb-2 text-xs tracking-[0.2em] uppercase flex items-center gap-2">
//                 <span className="w-1 h-1 bg-amber-400/60 rounded-full"></span>
//                 Booking Price (₹)
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/70 font-serif text-xl">₹</span>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Enter premium booking amount"
//                   required
//                   min="0"
//                   step="1"
//                   className="w-full bg-white/80 border border-amber-200/60 rounded-xl px-4 py-3.5 pl-10 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="relative w-full mt-8 group/btn overflow-hidden rounded-xl"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              
//               <div className="relative px-6 py-4 flex items-center justify-center gap-3">
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span className="text-white font-serif tracking-wider">Processing...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-white/80 text-xl">✦</span>
//                     <span className="text-white font-serif text-lg tracking-wider">Reserve Royal Table</span>
//                     <span className="text-white/80 text-xl">✦</span>
//                   </>
//                 )}
//               </div>
//             </button>
//           </form>

//           {/* Premium Footer */}
//           <div className="mt-10 pt-6 border-t border-amber-200/40 text-center">
//             <div className="flex justify-center items-center gap-4 mb-3">
//               <span className="text-amber-300/50 text-xs">◆</span>
//               <span className="text-amber-600/60 text-[10px] tracking-[0.3em] uppercase font-light">
//                 Where Luxury Meets Culinary Excellence
//               </span>
//               <span className="text-amber-300/50 text-xs">◆</span>
//             </div>
//             <p className="text-amber-400/50 text-[10px] tracking-wider font-light">
//               © 2024 Royal Dining Collection • Est. MMXXIV
//             </p>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
//           50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.6; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddTable;
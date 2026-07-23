
// import {
//   UploadCloud,
//   ImageIcon,
//   Layers3,
//   Tag,
//   Save,
//   X,
// } from "lucide-react";
// import axiosApiInstance from "../../helper";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function AddCategory() {
//   const navigate = useNavigate();



//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     image: null,
//     main: "",
//     sub: "",
//   });

//   const [preview, setPreview] = useState("");

//   useEffect(() => {
//   return () => {
//     if (preview) {
//       URL.revokeObjectURL(preview);
//     }
//   };
// }, [preview]);

//   // Handle Image
//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image size should be less than 5 MB");
//       return;
//     }

//     if (preview) {
//       URL.revokeObjectURL(preview);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       image: file,
//     }));

//     setPreview(URL.createObjectURL(file));
//   };

//   // Handle Inputs
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Remove Image
//   const removeImage = () => {
//     if (preview) {
//       URL.revokeObjectURL(preview);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       image: null,
//     }));

//     setPreview("");

//     const input = document.getElementById("categoryImage");

//     if (input) {
//       input.value = "";
//     }
//   };

//   // Submit Form
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!formData.image) {
//       return alert("Please select category image");
//     }

//     if (!formData.main.trim()) {
//       return alert("Please enter main category");
//     }

//     if (!formData.sub.trim()) {
//       return alert("Please enter sub category");
//     }

//     try {
//       setLoading(true);

//       const data = new FormData();

//       data.append("image", formData.image);
//       data.append("main", formData.main.trim());
//       data.append("sub", formData.sub.trim());

//       const response = await axiosApiInstance.post(
//         "/menu/create",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );


// console.log("Response =>", response);
// console.log("Response Data =>", response.data);

//       // alert(response.data.message);
//       alert("data create ")

//       if (preview) {
//         URL.revokeObjectURL(preview);
//       }

//       setFormData({
//         image: null,
//         main: "",
//         sub: "",
//       });

//       setPreview("");

//       const input = document.getElementById("categoryImage");

//       if (input) {
//         input.value = "";
//       }

//       navigate("/admin/categories");
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data?.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-6xl">

//         {/* Header */}

//         <div className="text-center mb-10">

//           <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
//             Shree SS
//           </h1>

//           <p className="text-gray-500 mt-3 text-lg">
//             Restaurant Menu Category Management
//           </p>

//           <p className="text-amber-600 text-sm mt-1">
//             🍽 Taste that stays in your heart
//           </p>

//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//                     {/* Left - Form */}

//           <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

//             <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8">

//               <h2 className="text-3xl font-bold text-white">
//                 Add New Category
//               </h2>

//               <p className="text-orange-100 mt-2">
//                 Create Restaurant Menu Categories
//               </p>

//             </div>

//             <form
//               onSubmit={submitHandler}
//               className="p-8 space-y-6"
//             >

//               {/* Main Category */}

//               <div>

//                 <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

//                   <Layers3
//                     size={18}
//                     className="text-orange-500"
//                   />

//                   Main Category

//                   <span className="text-red-500">*</span>

//                 </label>

//                 <input
//                   type="text"
//                   name="main"
//                   value={formData.main}
//                   onChange={handleChange}
//                   placeholder="Example : Food"
//                   required
//                   className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
//                 />

//               </div>

//               {/* Sub Category */}

//               <div>

//                 <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

//                   <Tag
//                     size={18}
//                     className="text-orange-500"
//                   />

//                   Sub Category

//                   <span className="text-red-500">*</span>

//                 </label>

//                 <input
//                   type="text"
//                   name="sub"
//                   value={formData.sub}
//                   onChange={handleChange}
//                   placeholder="Example : Paneer"
//                   required
//                   className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
//                 />

//               </div>

//               {/* Image Upload */}

//               <div>

//                 <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">

//                   <UploadCloud
//                     size={18}
//                     className="text-orange-500"
//                   />

//                   Category Image

//                   <span className="text-red-500">*</span>

//                 </label>

//                 {preview ? (

//                   <div className="relative border-2 border-orange-300 rounded-2xl overflow-hidden">

//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-full h-56 object-cover"
//                     />

//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
//                     >
//                       <X size={18} />
//                     </button>

//                   </div>

//                 ) : (

//                   <label className="border-2 border-dashed border-orange-300 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-50 transition">

//                    <input
//   id="categoryImage"
//   name="image"
//   type="file"
//   hidden
//   accept="image/*"
//   onChange={handleImage}
// />

//                     <UploadCloud
//                       size={55}
//                       className="text-orange-500"
//                     />

//                     <p className="mt-4 text-gray-600 font-medium">
//                       Click to Upload Image
//                     </p>

//                     <span className="text-sm text-gray-400 mt-2">
//                       JPG, PNG, WEBP (Max 5MB)
//                     </span>

//                   </label>

//                 )}

//               </div>

//               {/* Submit Button */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full rounded-xl py-4 text-white font-bold text-lg flex justify-center items-center gap-3 transition-all duration-300 ${
//                   loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 hover:shadow-xl"
//                 }`}
//               >

//                 {loading ? (

//                   <>

//                     <svg
//                       className="animate-spin h-5 w-5"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >

//                       <circle
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         opacity=".3"
//                       />

//                       <path
//                         d="M22 12a10 10 0 00-10-10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />

//                     </svg>

//                     Saving Category...

//                   </>

//                 ) : (

//                   <>

//                     <Save size={20} />

//                     Save Category

//                   </>

//                 )}

//               </button>

//             </form>

//           </div>
//                     {/* Right - Preview */}

//           <div className="bg-white rounded-3xl shadow-2xl p-8">

//             <h2 className="text-2xl font-bold mb-8">
//               Live Preview
//             </h2>

//             <div className="rounded-3xl overflow-hidden border shadow-xl">

//               {preview ? (

//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="w-full h-72 object-cover"
//                 />

//               ) : (

//                 <div className="h-72 flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">

//                   <ImageIcon
//                     size={70}
//                     className="text-orange-400"
//                   />

//                 </div>

//               )}

//               <div className="p-7">

//                 <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">

//                   {formData.main || "Main Category"}

//                 </span>

//                 <h3 className="text-3xl font-bold mt-5">

//                   {formData.main || "Food"}

//                 </h3>

//                 <p className="text-gray-500 mt-2 text-lg">

//                   {formData.sub || "Sub Category"}

//                 </p>

//               </div>

//             </div>

//             <div className="mt-8 rounded-2xl bg-orange-50 p-6 border border-orange-100">

//               <h4 className="text-xl font-bold text-orange-700">
//                 🍽 Shree SS Restaurant
//               </h4>

//               <p className="mt-2 text-gray-600">
//                 Manage your restaurant menu professionally with beautiful
//                 categories and high-quality images.
//               </p>

//               <div className="mt-4 space-y-2">

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Main</span>
//                   <span className="font-semibold text-orange-600">
//                     {formData.main || "-"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Sub</span>
//                   <span className="font-semibold text-orange-600">
//                     {formData.sub || "-"}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Image</span>
//                   <span className="font-semibold text-green-600">
//                     {formData.image ? "Selected ✓" : "Not Selected"}
//                   </span>
//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }




import {
  UploadCloud,
  ImageIcon,
  Layers3,
  Tag,
  Save,
  X,
} from "lucide-react";
import axiosApiInstance from "../../helper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddCategory() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: null,
    main: "",
    sub: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // Handle Inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Remove Image
  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setPreview("");

    const input = document.getElementById("categoryImage");

    if (input) {
      input.value = "";
    }
  };

  // Submit Form
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      return alert("Please select category image");
    }

    if (!formData.main.trim()) {
      return alert("Please enter main category");
    }

    if (!formData.sub.trim()) {
      return alert("Please enter sub category");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("image", formData.image);
      data.append("main", formData.main.trim());
      data.append("sub", formData.sub.trim());

      const response = await axiosApiInstance.post(
        "/menu/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response =>", response);
      console.log("Response Data =>", response.data);

      alert("Category created successfully! 🎉");

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setFormData({
        image: null,
        main: "",
        sub: "",
      });

      setPreview("");

      const input = document.getElementById("categoryImage");

      if (input) {
        input.value = "";
      }

      navigate("/admin/categories");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating cream particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
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

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300/60"></div>
            <span className="text-amber-400 text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300/60"></div>
          </div>
          
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent tracking-wide">
            Shree SS
          </h1>

          <div className="flex justify-center items-center gap-3 mt-2">
            <span className="text-amber-400 text-sm">★</span>
            <p className="text-amber-600/60 font-light text-sm tracking-[0.2em] uppercase">
              Restaurant Menu Category Management
            </p>
            <span className="text-amber-400 text-sm">★</span>
          </div>

          <p className="text-amber-500/50 text-sm mt-1 italic">
            "Taste that stays in your heart ❤️"
          </p>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-[2rem] blur-sm"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/30 overflow-hidden border border-amber-200/50">
              <div className="bg-gradient-to-r from-amber-100/80 via-amber-50/80 to-yellow-50/80 p-8 border-b border-amber-200/30">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <Layers3 size={28} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-amber-800">Add New Category</h2>
                    <p className="text-amber-600/70 text-sm font-light tracking-wide">
                      Create Restaurant Menu Categories
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={submitHandler} className="p-8 space-y-6">
                {/* Main Category */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <Layers3 size={16} className="text-amber-500" />
                    Main Category
                    <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <input
                      type="text"
                      name="main"
                      value={formData.main}
                      onChange={handleChange}
                      placeholder="Example: Food"
                      required
                      className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-5 py-4 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Sub Category */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <Tag size={16} className="text-amber-500" />
                    Sub Category
                    <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <input
                      type="text"
                      name="sub"
                      value={formData.sub}
                      onChange={handleChange}
                      placeholder="Example: Paneer"
                      required
                      className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-5 py-4 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="group">
                  <label className="flex items-center gap-2 text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-3">
                    <UploadCloud size={16} className="text-amber-500" />
                    Category Image
                    <span className="text-amber-400">*</span>
                  </label>

                  {preview ? (
                    <div className="relative border-2 border-amber-300/60 rounded-2xl overflow-hidden shadow-lg shadow-amber-200/20">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none"></div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-amber-300/60 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-amber-50/50 transition-all duration-300 group-hover:border-amber-400">
                      <input
                        id="categoryImage"
                        name="image"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImage}
                      />
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <UploadCloud
                          size={60}
                          className="text-amber-400 relative z-10 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="mt-4 text-amber-700/70 font-medium">
                        Click to Upload Image
                      </p>
                      <span className="text-sm text-amber-400/60 mt-2">
                        JPG, PNG, WEBP (Max 5MB)
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group/btn overflow-hidden rounded-xl mt-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".3"/>
                          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4"/>
                        </svg>
                        <span className="text-white font-serif tracking-wider">Saving Category...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-white/80 text-lg">✦</span>
                        <Save size={20} className="text-white" />
                        <span className="text-white font-serif text-base tracking-wider">Save Category</span>
                        <span className="text-white/80 text-lg">✦</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-[2rem] blur-sm"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/30 p-8 border border-amber-200/50 h-full">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-amber-400 text-lg">✦</span>
                <h2 className="text-2xl font-serif font-bold text-amber-800">Live Preview</h2>
                <span className="text-amber-400 text-lg">✦</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-amber-200/50 shadow-lg shadow-amber-200/20">
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="h-72 flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
                    <div className="text-center">
                      <ImageIcon size={70} className="text-amber-300 mx-auto" />
                      <p className="text-amber-400/60 text-sm mt-3">No image selected</p>
                    </div>
                  </div>
                )}

                <div className="p-7 bg-gradient-to-b from-white to-amber-50/30">
                  <span className="inline-block bg-amber-100/80 text-amber-700 px-4 py-2 rounded-full text-xs font-semibold tracking-wider border border-amber-200/50">
                    {formData.main || "Main Category"}
                  </span>

                  <h3 className="text-3xl font-serif font-bold text-amber-800 mt-5">
                    {formData.main || "Food"}
                  </h3>

                  <p className="text-amber-600/70 mt-2 text-lg font-light">
                    {formData.sub || "Sub Category"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-6 border border-amber-200/40 shadow-inner">
                <h4 className="text-lg font-serif font-bold text-amber-800 flex items-center gap-2">
                  <span>🍽</span> Shree SS Restaurant
                </h4>
                <p className="mt-2 text-amber-700/60 text-sm font-light">
                  Manage your restaurant menu professionally with beautiful
                  categories and high-quality images.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-amber-200/30">
                    <span className="text-amber-600/60 font-light">Main</span>
                    <span className="font-semibold text-amber-700">
                      {formData.main || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-amber-200/30">
                    <span className="text-amber-600/60 font-light">Sub</span>
                    <span className="font-semibold text-amber-700">
                      {formData.sub || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-amber-600/60 font-light">Image</span>
                    <span className={`font-semibold ${formData.image ? 'text-emerald-600' : 'text-amber-400/60'}`}>
                      {formData.image ? "✓ Selected" : "Not Selected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
}
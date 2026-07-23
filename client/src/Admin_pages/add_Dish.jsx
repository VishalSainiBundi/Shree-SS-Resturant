// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import GetMenu from '../../api_calls/getMenu';
// import axiosApiInstance from '../../helper';

// const AddDish = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [mainCategories, setMainCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [filteredSubs, setFilteredSubs] = useState([]);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     // rating: '',/
//     image: '',
//     main: '',
//     sub: '',
//     feature: false
//   });
//   const [previewImage, setPreviewImage] = useState('');

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const data = await GetMenu();
//         console.log("Full API Response:", data);

//         // API returns { success: true, data: [...] }
//         const categoriesArray = (data?.success && Array.isArray(data.data)) ? data.data : [];

//         console.log("Categories Array:", categoriesArray);
//         setCategories(categoriesArray);

//         // Extract unique main categories
//         const mains = [...new Set(categoriesArray.map(item => item.main))];
//         console.log("Main Categories:", mains);
//         setMainCategories(mains);

//         // Extract all sub categories
//         const subs = categoriesArray.map(item => item.sub);
//         console.log("All Sub Categories:", subs);
//         setSubCategories(subs);      } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategory();
//   }, []);

//   // Filter sub-categories based on selected main category
//   useEffect(() => {
//     if (formData.main) {
//       const filtered = categories
//         .filter(item => item.main === formData.main)
//         .map(item => item.sub);
//       // console.log("Filtered Subs for", formData.main, ":", filtered);
//       setFilteredSubs(filtered);
//     } else {
//       setFilteredSubs([]);
//     }
//   }, [formData.main, categories]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Reset sub category when main category changes
//     if (name === 'main') {
//       setFormData(prev => ({ ...prev, sub: '' }));
//     }

//     // Update image preview
//     if (name === 'image' && value) {
//       setPreviewImage(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axiosApiInstance.post('/dish/create', formData);
//       console.log(response.data)
//       if (response.status === 200) {
//         alert('✅ Dish added successfully!');
//         navigate('/admin/dishes');
//       }
//     } catch (error) {
//       console.error('Error adding dish:', error);
//       alert(error.response?.data?.message || 'Failed to add dish. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-amber-200">
//             <i className="fas fa-plus-circle mr-2"></i> Add New Dish
//           </span>
//           <h1 className="text-3xl md:text-4xl font-light text-gray-800">
//             Add to <span className="font-bold text-amber-800">Menu</span>
//           </h1>
//           <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
//             SHREE SS RESTAURANT · Taste that stays in your heart ❤️
//           </p>
//           <div className="w-20 h-1 bg-amber-600 mx-auto mt-4"></div>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
//           <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-6 sm:px-8 py-5">
//             <div className="flex items-center gap-3 text-white">
//               <i className="fas fa-utensils text-xl sm:text-2xl"></i>
//               <div>
//                 <h2 className="text-lg sm:text-xl font-semibold">Dish Details</h2>
//                 <p className="text-amber-200 text-xs sm:text-sm">Fill in the information below to add a new dish</p>
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Dish Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <i className="fas fa-tag text-amber-600 mr-2"></i>
//                   Dish Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
//                   placeholder="e.g., Butter Chicken"
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <i className="fas fa-dollar-sign text-amber-600 mr-2"></i>
//                   Price <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   step="0.01"
//                   min="0"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
//                   placeholder="e.g., 24.99"
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 <i className="fas fa-align-left text-amber-600 mr-2"></i>
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows="3"
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none resize-none"
//                 placeholder="Describe the dish in detail..."
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Category - Main */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <i className="fas fa-utensil-spoon text-amber-600 mr-2"></i>
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="main"
//                   value={formData.main}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none appearance-none bg-white"
//                 >
//                   <option value="">Select Category</option>
//                   {mainCategories.map((main, index) => (
//                     <option key={index} value={main}>
//                       {main}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sub Category */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <i className="fas fa-tag text-amber-600 mr-2"></i>
//                   Sub Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="sub"
//                   value={formData.sub}
//                   onChange={handleChange}
//                   required
//                   disabled={!formData.main}
//                   className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none appearance-none bg-white ${
//                     !formData.main ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   <option value="">Select Sub Category</option>
//                   {filteredSubs.map((sub, index) => (
//                     <option key={index} value={sub}>
//                       {sub}
//                     </option>
//                   ))}
//                 </select>
//                 {!formData.main && (
//                   <p className="text-xs text-gray-400 mt-1">Please select a category first</p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Rating */}
//               {/* <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <i className="fas fa-star text-amber-600 mr-2"></i>
//                   Rating (1-5)
//                 </label>
//                 <input
//                   type="number"
//                   name="rating"
//                   value={formData.rating}
//                   onChange={handleChange}
//                   min="1"
//                   max="5"
//                   step="0.1"
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
//                   placeholder="e.g., 4.5"
//                 />
//               </div> */}

//               {/* Feature Checkbox */}
//               <div className="flex items-center">
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="feature"
//                     checked={formData.feature}
//                     onChange={handleChange}
//                     className="w-5 h-5 text-amber-600 border-2 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
//                   />
//                   <span className="ml-3 text-sm font-medium text-gray-700">
//                     <i className="fas fa-crown text-amber-600 mr-2"></i>
//                     Feature as Chef's Special
//                   </span>
//                 </label>
//               </div>
//             </div>

//             {/* Image URL */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 <i className="fas fa-image text-amber-600 mr-2"></i>
//                 Image URL <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="url"
//                 name="image"
//                 value={formData.image}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>

//             {/* Image Preview */}
//             {previewImage && (
//               <div className="mt-2">
//                 <p className="text-sm font-medium text-gray-600 mb-2">Image Preview:</p>
//                 <div className="relative rounded-xl overflow-hidden border-2 border-amber-200 max-w-xs">
//                   <img 
//                     src={previewImage} 
//                     alt="Dish preview" 
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=Invalid+Image+URL';
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-gray-100">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <i className="fas fa-spinner fa-spin"></i>
//                     Adding Dish...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-plus-circle"></i>
//                     Add Dish to Menu
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate('/admin/dishes')}
//                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
//               >
//                 <i className="fas fa-times"></i>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center mt-8 text-sm text-gray-400">
//           <p>SHREE SS RESTAURANT · Taste that stays in your heart ❤️</p>
//           <p className="text-xs mt-1">All fields marked with <span className="text-red-500">*</span> are required</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDish;




import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetMenu from '../../api_calls/getMenu';
import axiosApiInstance from '../../helper';

const AddDish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubs, setFilteredSubs] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    main: '',
    sub: '',
    feature: false
  });
  const [previewImage, setPreviewImage] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await GetMenu();
        console.log("Full API Response:", data);

        const categoriesArray = (data?.success && Array.isArray(data.data)) ? data.data : [];

        console.log("Categories Array:", categoriesArray);
        setCategories(categoriesArray);

        const mains = [...new Set(categoriesArray.map(item => item.main))];
        console.log("Main Categories:", mains);
        setMainCategories(mains);

        const subs = categoriesArray.map(item => item.sub);
        console.log("All Sub Categories:", subs);
        setSubCategories(subs);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategory();
  }, []);

  // Filter sub-categories based on selected main category
  useEffect(() => {
    if (formData.main) {
      const filtered = categories
        .filter(item => item.main === formData.main)
        .map(item => item.sub);
      setFilteredSubs(filtered);
    } else {
      setFilteredSubs([]);
    }
  }, [formData.main, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'main') {
      setFormData(prev => ({ ...prev, sub: '' }));
    }

    if (name === 'image' && value) {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosApiInstance.post('/dish/create', formData);
      console.log(response.data)
      if (response.status === 200) {
        alert('✅ Dish added successfully!');
        navigate('/admin/dishes');
      }
    } catch (error) {
      console.error('Error adding dish:', error);
      alert(error.response?.data?.message || 'Failed to add dish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/50 py-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300/60"></div>
            <span className="text-amber-400 text-2xl">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300/60"></div>
          </div>
          
          <span className="inline-block bg-amber-100/80 text-amber-800 text-xs font-semibold tracking-[0.2em] px-5 py-2 rounded-full mb-4 border border-amber-200/60 backdrop-blur-sm uppercase">
            <i className="fas fa-plus-circle mr-2 text-amber-500"></i> Add New Dish
          </span>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-800 tracking-wide">
            Add to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Menu</span>
          </h1>
          
          <div className="flex justify-center items-center gap-3 mt-3">
            <span className="text-amber-400 text-sm">★</span>
            <p className="text-amber-600/60 font-light text-sm tracking-[0.2em] uppercase">
              SHREE SS RESTAURANT
            </p>
            <span className="text-amber-400 text-sm">★</span>
          </div>
          
          <p className="text-amber-500/50 text-sm mt-1 italic">
            "Taste that stays in your heart ❤️"
          </p>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <div className="relative">
          {/* Decorative frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-[2rem] blur-sm"></div>
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/30 overflow-hidden border border-amber-200/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-100/80 via-amber-50/80 to-yellow-50/80 px-6 sm:px-8 py-6 border-b border-amber-200/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <i className="fas fa-utensils text-white text-xl"></i>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-800">Dish Details</h2>
                  <p className="text-amber-600/70 text-xs sm:text-sm font-light tracking-wide">
                    Fill in the information below to add a new dish
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-amber-300 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Dish Name */}
                <div className="group">
                  <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <i className="fas fa-tag text-amber-500 mr-2"></i>
                    Dish Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
                      placeholder="e.g., Butter Chicken"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="group">
                  <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <i className="fas fa-dollar-sign text-amber-500 mr-2"></i>
                    Price <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/60 font-serif text-lg">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 pl-10 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
                      placeholder="e.g., 24.99"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                  <i className="fas fa-align-left text-amber-500 mr-2"></i>
                  Description <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 resize-none"
                    placeholder="Describe the dish in detail..."
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category - Main */}
                <div className="group">
                  <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <i className="fas fa-utensil-spoon text-amber-500 mr-2"></i>
                    Category <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <select
                      name="main"
                      value={formData.main}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 outline-none text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="text-amber-400/60">Select Category</option>
                      {mainCategories.map((main, index) => (
                        <option key={index} value={main} className="text-amber-800">
                          {main}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/60">▾</span>
                  </div>
                </div>

                {/* Sub Category */}
                <div className="group">
                  <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                    <i className="fas fa-tag text-amber-500 mr-2"></i>
                    Sub Category <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <select
                      name="sub"
                      value={formData.sub}
                      onChange={handleChange}
                      required
                      disabled={!formData.main}
                      className={`w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 outline-none text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 appearance-none cursor-pointer ${
                        !formData.main ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="" className="text-amber-400/60">Select Sub Category</option>
                      {filteredSubs.map((sub, index) => (
                        <option key={index} value={sub} className="text-amber-800">
                          {sub}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400/60">▾</span>
                  </div>
                  {!formData.main && (
                    <p className="text-xs text-amber-400/60 mt-1 italic">Please select a category first</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Feature Checkbox */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="feature"
                        checked={formData.feature}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 border-2 border-amber-300/60 rounded focus:ring-amber-400 focus:ring-2 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium text-amber-700/80 group-hover:text-amber-800 transition-colors">
                      <i className="fas fa-crown text-amber-500 mr-2"></i>
                      Feature as Chef's Special
                    </span>
                  </label>
                </div>
              </div>

              {/* Image URL */}
              <div className="group">
                <label className="block text-xs font-semibold text-amber-700/80 uppercase tracking-[0.1em] mb-2">
                  <i className="fas fa-image text-amber-500 mr-2"></i>
                  Image URL <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-yellow-100/30 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/80 border-2 border-amber-200/60 rounded-xl px-4 py-3 outline-none text-amber-900 placeholder:text-amber-300/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="mt-2">
                  <p className="text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em] mb-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                    Image Preview
                  </p>
                  <div className="relative rounded-xl overflow-hidden border-2 border-amber-200/60 max-w-xs shadow-lg shadow-amber-200/20">
                    <img 
                      src={previewImage} 
                      alt="Dish preview" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=Invalid+Image+URL';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-amber-200/30">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex-1 group/btn overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-white"></i>
                        <span className="text-white font-serif tracking-wider">Adding Dish...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-white/80 text-lg">✦</span>
                        <span className="text-white font-serif text-base tracking-wider">Add Dish to Menu</span>
                        <span className="text-white/80 text-lg">✦</span>
                      </>
                    )}
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/admin/dishes')}
                  className="flex-1 bg-amber-100/50 hover:bg-amber-200/50 text-amber-700 font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-amber-200/40 hover:border-amber-300/60"
                >
                  <i className="fas fa-times"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <div className="flex justify-center items-center gap-3 mb-2">
            <span className="text-amber-300/40 text-xs">◆</span>
            <p className="text-xs text-amber-500/50 font-light tracking-[0.2em] uppercase">
              SHREE SS RESTAURANT · Taste that stays in your heart ❤️
            </p>
            <span className="text-amber-300/40 text-xs">◆</span>
          </div>
          <p className="text-[10px] text-amber-400/40 tracking-wider">
            All fields marked with <span className="text-amber-400">*</span> are required
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

export default AddDish;
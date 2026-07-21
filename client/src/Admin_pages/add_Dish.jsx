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
    // rating: '',/
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
        
        // Get the menu array from the response
        let menuData = data?.menu || data?.data || data;
        
        // If menuData is an array, use it directly
        const categoriesArray = Array.isArray(menuData) ? menuData : [];
        
        console.log("Categories Array:", categoriesArray);
        setCategories(categoriesArray);

        // Extract unique main categories
        const mains = [...new Set(categoriesArray.map(item => item.main))];
        console.log("Main Categories:", mains);
        setMainCategories(mains);

        // Extract all sub categories
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
      // console.log("Filtered Subs for", formData.main, ":", filtered);
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

    // Reset sub category when main category changes
    if (name === 'main') {
      setFormData(prev => ({ ...prev, sub: '' }));
    }

    // Update image preview
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-amber-200">
            <i className="fas fa-plus-circle mr-2"></i> Add New Dish
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-gray-800">
            Add to <span className="font-bold text-amber-800">Menu</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            SHREE SS RESTAURANT · Taste that stays in your heart ❤️
          </p>
          <div className="w-20 h-1 bg-amber-600 mx-auto mt-4"></div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-6 sm:px-8 py-5">
            <div className="flex items-center gap-3 text-white">
              <i className="fas fa-utensils text-xl sm:text-2xl"></i>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Dish Details</h2>
                <p className="text-amber-200 text-xs sm:text-sm">Fill in the information below to add a new dish</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Dish Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-tag text-amber-600 mr-2"></i>
                  Dish Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
                  placeholder="e.g., Butter Chicken"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-dollar-sign text-amber-600 mr-2"></i>
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
                  placeholder="e.g., 24.99"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-align-left text-amber-600 mr-2"></i>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none resize-none"
                placeholder="Describe the dish in detail..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category - Main */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-utensil-spoon text-amber-600 mr-2"></i>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="main"
                  value={formData.main}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none appearance-none bg-white"
                >
                  <option value="">Select Category</option>
                  {mainCategories.map((main, index) => (
                    <option key={index} value={main}>
                      {main}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-tag text-amber-600 mr-2"></i>
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="sub"
                  value={formData.sub}
                  onChange={handleChange}
                  required
                  disabled={!formData.main}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none appearance-none bg-white ${
                    !formData.main ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="">Select Sub Category</option>
                  {filteredSubs.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {!formData.main && (
                  <p className="text-xs text-gray-400 mt-1">Please select a category first</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Rating */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-star text-amber-600 mr-2"></i>
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
                  placeholder="e.g., 4.5"
                />
              </div> */}

              {/* Feature Checkbox */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="feature"
                    checked={formData.feature}
                    onChange={handleChange}
                    className="w-5 h-5 text-amber-600 border-2 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    <i className="fas fa-crown text-amber-600 mr-2"></i>
                    Feature as Chef's Special
                  </span>
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-image text-amber-600 mr-2"></i>
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Image Preview */}
            {previewImage && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600 mb-2">Image Preview:</p>
                <div className="relative rounded-xl overflow-hidden border-2 border-amber-200 max-w-xs">
                  <img 
                    src={previewImage} 
                    alt="Dish preview" 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Adding Dish...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus-circle"></i>
                    Add Dish to Menu
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dishes')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>SHREE SS RESTAURANT · Taste that stays in your heart ❤️</p>
          <p className="text-xs mt-1">All fields marked with <span className="text-red-500">*</span> are required</p>
        </div>
      </div>
    </div>
  );
};

export default AddDish;


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

      // alert(response.data.message);
      alert("data create ")

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Shree SS
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Restaurant Menu Category Management
          </p>

          <p className="text-amber-600 text-sm mt-1">
            🍽 Taste that stays in your heart
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left - Form */}

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8">

              <h2 className="text-3xl font-bold text-white">
                Add New Category
              </h2>

              <p className="text-orange-100 mt-2">
                Create Restaurant Menu Categories
              </p>

            </div>

            <form
              onSubmit={submitHandler}
              className="p-8 space-y-6"
            >

              {/* Main Category */}

              <div>

                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

                  <Layers3
                    size={18}
                    className="text-orange-500"
                  />

                  Main Category

                  <span className="text-red-500">*</span>

                </label>

                <input
                  type="text"
                  name="main"
                  value={formData.main}
                  onChange={handleChange}
                  placeholder="Example : Food"
                  required
                  className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />

              </div>

              {/* Sub Category */}

              <div>

                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

                  <Tag
                    size={18}
                    className="text-orange-500"
                  />

                  Sub Category

                  <span className="text-red-500">*</span>

                </label>

                <input
                  type="text"
                  name="sub"
                  value={formData.sub}
                  onChange={handleChange}
                  placeholder="Example : Paneer"
                  required
                  className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />

              </div>

              {/* Image Upload */}

              <div>

                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">

                  <UploadCloud
                    size={18}
                    className="text-orange-500"
                  />

                  Category Image

                  <span className="text-red-500">*</span>

                </label>

                {preview ? (

                  <div className="relative border-2 border-orange-300 rounded-2xl overflow-hidden">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-56 object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                    >
                      <X size={18} />
                    </button>

                  </div>

                ) : (

                  <label className="border-2 border-dashed border-orange-300 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-50 transition">

                   <input
  id="categoryImage"
  name="image"
  type="file"
  hidden
  accept="image/*"
  onChange={handleImage}
/>

                    <UploadCloud
                      size={55}
                      className="text-orange-500"
                    />

                    <p className="mt-4 text-gray-600 font-medium">
                      Click to Upload Image
                    </p>

                    <span className="text-sm text-gray-400 mt-2">
                      JPG, PNG, WEBP (Max 5MB)
                    </span>

                  </label>

                )}

              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-4 text-white font-bold text-lg flex justify-center items-center gap-3 transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 hover:shadow-xl"
                }`}
              >

                {loading ? (

                  <>

                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >

                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        opacity=".3"
                      />

                      <path
                        d="M22 12a10 10 0 00-10-10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                    </svg>

                    Saving Category...

                  </>

                ) : (

                  <>

                    <Save size={20} />

                    Save Category

                  </>

                )}

              </button>

            </form>

          </div>
                    {/* Right - Preview */}

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Live Preview
            </h2>

            <div className="rounded-3xl overflow-hidden border shadow-xl">

              {preview ? (

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-72 object-cover"
                />

              ) : (

                <div className="h-72 flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">

                  <ImageIcon
                    size={70}
                    className="text-orange-400"
                  />

                </div>

              )}

              <div className="p-7">

                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">

                  {formData.main || "Main Category"}

                </span>

                <h3 className="text-3xl font-bold mt-5">

                  {formData.main || "Food"}

                </h3>

                <p className="text-gray-500 mt-2 text-lg">

                  {formData.sub || "Sub Category"}

                </p>

              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-orange-50 p-6 border border-orange-100">

              <h4 className="text-xl font-bold text-orange-700">
                🍽 Shree SS Restaurant
              </h4>

              <p className="mt-2 text-gray-600">
                Manage your restaurant menu professionally with beautiful
                categories and high-quality images.
              </p>

              <div className="mt-4 space-y-2">

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Main</span>
                  <span className="font-semibold text-orange-600">
                    {formData.main || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Sub</span>
                  <span className="font-semibold text-orange-600">
                    {formData.sub || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Image</span>
                  <span className="font-semibold text-green-600">
                    {formData.image ? "Selected ✓" : "Not Selected"}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
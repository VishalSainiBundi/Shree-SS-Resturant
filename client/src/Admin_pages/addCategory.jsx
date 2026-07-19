import { useState } from "react";
import axiosApiInstance from "../../helper";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    main: "",
    sub: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.main) {
      return alert("Main Category is required");
    }

    if (!formData.sub) {
      return alert("Sub Category is required");
    }

    try {
      setLoading(true);

      const res = await axiosApiInstance.post(
        "/menu/create",
        formData
      );

      alert(res.data.msg || "Category Added Successfully");

      setFormData({
        main: "",
        sub: "",
        status: true,
      });

      navigate("/admin/category");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold">
              Main Category
            </label>

            <input
              type="text"
              name="main"
              value={formData.main}
              onChange={handleChange}
              placeholder="Enter Main Category"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Sub Category
            </label>

            <input
              type="text"
              name="sub"
              value={formData.sub}
              onChange={handleChange}
              placeholder="Enter Sub Category"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />

            <label>Active</label>
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Add Category"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCategory;
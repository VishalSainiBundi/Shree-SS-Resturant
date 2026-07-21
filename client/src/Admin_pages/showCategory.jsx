import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosApiInstance from "../../helper";
import DeleteBtn from "../components/deleteBtn";

const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      setLoading(true);

      const res = await axiosApiInstance.get("/menu/get");

      setCategories(res.data.menu || []);
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

  const imageUrl = (image) => {
    if (!image || image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  // const deleteCategory = async (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this category?"
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     const res = await axiosApiInstance.delete(`/menu/delete/${id}`);

  //     alert(res.data.msg);

  //     getCategories();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Delete Failed");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-orange-600">
            Category List
          </h1>

          <Link
            to="/admin/category/add"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Category
          </Link>

        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-orange-600 text-white">

              <tr>

                <th className="p-4">#</th>
                <th>Main Category</th>
                <th>Sub Category</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    No Category Found
                  </td>
                </tr>
              ) : (
                categories.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td>{item.main}</td>

                    <td>{item.sub}</td>

                    {/* <td>
                      <img
                        src={imageUrl(item.image)}
                        alt={item.sub}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </td> */}

                    <td>
                      {item.image}
                    </td>

                    <td>
                      {item.status ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td>


                        <DeleteBtn id={item._id} url={`/menu/`} onDelete={getCategories}/>


                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ShowCategory;



import axiosApiInstance from "../../helper";

const DeleteBtn = ({ id, url, onDelete }) => {
  const deleteUser = async () => {
    // कन्फर्मेशन डायलॉग
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axiosApiInstance.delete(`${url}delete/${id}`);

     

      // Parent component से data refresh करवाएं
      if (onDelete) {
        await onDelete(); // await का उपयोग करें
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={deleteUser}
      className="bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
    >
      Delete
    </button>
  );
};

export default DeleteBtn;
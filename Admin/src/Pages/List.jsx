import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function LIst() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token"); // Ensure token is stored

  // Fetch Product List
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/list`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to fetch products");
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    if (!token) {
      toast.error("User is not authenticated");
      return;
    }

    try {
       

      const response = await axios.delete(`${backendUrl}/api/v1/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error removing product:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete the product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-4 text-xl font-semibold">All Product List</p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-400 text-white text-sm uppercase">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover mx-auto rounded-md"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LIst;

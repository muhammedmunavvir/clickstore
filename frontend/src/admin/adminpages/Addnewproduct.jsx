import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Addnewproduct = () => {
  const [product, setProduct] = useState({
    heading: "",
    discription: "",
    catogory: "",
    price: "",
    rating: "",
    qty: 1,
    measurement: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("image", image);

      await axios.post(`http://localhost:8080/admin/newProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      navigate("/admin/allproducts");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        🛍️ Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={product.heading}
            onChange={inputHandle}
            placeholder="Enter product title"
            required
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="discription"
            value={product.discription}
            onChange={inputHandle}
            placeholder="Short description"
            required
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm resize-none h-24 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Upload Image
          </label>
          <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Category
          </label>
          <select
            name="catogory"
            value={product.catogory}
            onChange={inputHandle}
            required
            className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery</option>
            <option value="books">Books</option>
            <option value="garments">Garments</option>
          </select>
        </div>

        {/* Price & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Price ₹
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={inputHandle}
              placeholder="e.g. 999"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Rating ⭐
            </label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={inputHandle}
              min="1"
              max="5"
              placeholder="1-5"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Measurement
            </label>
            <input
              type="text"
              name="measurement"
              value={product.measurement}
              onChange={inputHandle}
              placeholder="e.g. 500ml, 1kg"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-bold shadow-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </span>
            ) : (
              "➕ Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

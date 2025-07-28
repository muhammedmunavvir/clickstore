import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carthandle } from "../foraddcart/Addcart";
import { toast } from "react-toastify";

const Productdetails = () => {
  const { id } = useParams();
  const [product, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/products/${id}`);
        setProducts(res.data.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProducts();
  }, [id]);

  const tocart = async (product) => {
    const userLoggedIn =
      localStorage.getItem("userid") && localStorage.getItem("userrole");
    if (userLoggedIn) {
      await carthandle(product);
    } else {
      toast.warning("Please log in to add a product");
      navigate("/auth/login");
    }
  };

  const backclickhandle = () => navigate(-1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
        <p className="text-lg">No product found with ID {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.url}
            alt={product.heading}
            className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          {/* Back Button */}
          <button
            onClick={backclickhandle}
            className="mb-4 inline-flex items-center text-sm text-blue-400 hover:underline"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </button>

          <div>
            <h1 className="text-3xl font-extrabold mb-4">{product.heading}</h1>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              {product.discription}
            </p>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              {product.measurement}
            </p>

            <div className="mb-6">
              <span className="text-2xl font-bold text-blue-400">₹{product.price}</span>
              <div className="mt-2 inline-block bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                ⭐ {product.rating}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => tocart(product)}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-transform duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Prodectgrid = () => {
  const [featuredproducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products/featured");
        setFeaturedProducts(res.data.data || []);
      } catch (error) {
        console.log("error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    getproduct();
  }, []);

  const fordetails = (id) => {
    navigate(`/Productdetails/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            Featured Products
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products designed to elevate your lifestyle
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredproducts.map((obj, index) => (
            <div
              onClick={() => fordetails(obj._id)}
              key={obj._id}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={obj.url}
                  alt={obj.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  ₹{obj.price}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white/90 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300 hover:bg-white">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {obj.name}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {obj.heading}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      ₹{obj.price}
                    </span>
                    <span className="text-xs text-gray-500">Free Shipping</span>
                  </div>

                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-purple-500">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H3m4 6v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-purple-500">
            <span>Load More Products</span>
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

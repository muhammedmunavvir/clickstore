import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/apiconfig";

export const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/all`);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
  .filter((product) => {
    const heading = product.heading ?? "";        
    const description = product.discription ?? ""; 
    
    const matchSearch =
      heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || product.catogory === selectedCategory;
    return matchSearch && matchCategory;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return (a.heading ?? "").localeCompare(b.heading ?? "");
    }
  });


  const fordetails = (id) => navigate(`/productdetails/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Loading Products</h3>
          <p className="text-gray-400">Please wait while we fetch the products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Glowing Backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore top-quality items curated just for you.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ring-blue-500/30"
            />
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
              <option value="books">Books</option>
            </select>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((obj, index) => (
            <div
              key={obj._id}
              onClick={() => fordetails(obj._id)}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="relative overflow-hidden">
                <img
                  src={obj.url}
                  alt={obj.heading}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {obj.rating} ⭐
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ₹{obj.price}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">{obj.heading}</h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{obj.description}</p>
                <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                  {obj.catogory}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

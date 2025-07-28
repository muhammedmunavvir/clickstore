import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Edit3,
  Trash2,
  Star,
  Package,
  ShoppingCart,
} from "lucide-react";

export const Category = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/products/all");
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/deleteProduct/${_id}`);
      toast.success("Product deleted");
      setProduct((prev) => prev.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Deletion failed");
    }
  };

  const handleEdit = (_id) => {
    navigate(`/admin/editing/${_id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  const categories = [
    { name: "grocery", icon: ShoppingCart, color: "from-green-400 to-green-600", bgColor: "bg-green-50" },
    { name: "electronics", icon: Package, color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
    { name: "books", icon: Package, color: "from-purple-400 to-purple-600", bgColor: "bg-purple-50" },
    { name: "garments", icon: Package, color: "from-pink-400 to-pink-600", bgColor: "bg-pink-50" },
  ];

  const groupedProducts = categories.reduce((acc, cat) => {
    acc[cat.name] = product.filter(
      (item) =>
        item.catogory?.toLowerCase() === cat.name ||
        item.Catogory?.toLowerCase() === cat.name
    );
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>

        {categories.map((category) => {
          const IconComponent = category.icon;
          const categoryProducts = groupedProducts[category.name] || [];

          return (
            <div key={category.name} className="mb-16">
              <div className={`${category.bgColor} rounded-2xl p-6 mb-8 border border-gray-200`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 capitalize mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {categoryProducts.length} products available
                    </p>
                  </div>
                </div>
              </div>

              {categoryProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-500">
                    No {category.name} products are currently available.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((obj) => (
                    <div
                      key={obj._id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={obj.url}
                          alt={obj.heading}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-900">{obj.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                            {obj.heading}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {obj.discription}
                          </p>

                          <span className={`inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r ${category.color} rounded-full capitalize`}>
                            {obj.catogory}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 mb-4">
                          {renderStars(obj.rating)}
                          <span className="text-sm text-gray-500 ml-2">({obj.rating})</span>
                        </div>

                        <div className="mb-6">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{obj.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                            onClick={() => handleEdit(obj._id)}
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                            onClick={() => handleDelete(obj._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Loader2,
  ArrowRight,
  Package,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { useCartstore } from "../store/cartstore";

const Cartpage = () => {

  window.scroll(0,0)
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const { cart, removeItem, fetchCart,updateQty  } = useCartstore();

  useEffect(() => {
    const loadCart = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        navigate("/auth/login");
        return;
      }

      const success = await fetchCart(userId);
      setLoading(false);
      if (!success) toast.error("Failed to load cart");
    };

    loadCart();
  }, []);

  const removeitem = async (productId) => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      toast.error("User not found");
      navigate("/auth/login");
      return;
    }

    try {
      setRemovingId(productId);
      await removeItem(productId);
      toast.warning("Item removed from your cart");
    } catch (error) {
      console.error("Error removing item", error);
      toast.error("Failed to remove item from cart");
    } finally {
      setRemovingId(null);
    }
  };

 const inc = async (id) => {
  const product = cart.find((item) => item.product._id === id);
  if (product.qty >= 8) {
    toast.warning("Maximum quantity is 8");
    return;
  }
  try {
    await updateQty(id, "increment");
  } catch (error) {
    toast.error("Failed to increment quantity");
  }
};

const dec = async (id) => {
  const product = cart.find((item) => item.product._id === id);
  if (product.qty <= 1) {
    toast.warning("Minimum quantity is 1");
    return;
  }
  try {
    await updateQty(id, "decrement");
  } catch (error) {
    toast.error("Failed to decrement quantity");
  }
};

  const paymenthandle = () => {
    navigate("/payment");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <button
              onClick={() => navigate("/Allproducts")}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Start Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const product = item.product;
              const qty = item.qty;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          product.url || "/placeholder.svg?height=120&width=120"
                        }
                        alt={product.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                          {product.name}
                        </h3>
                        <button
                          onClick={() => removeitem(product._id)}
                          disabled={removingId === product._id}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          title="Remove item"
                        >
                          {removingId === product._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{(product.price * qty).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            (₹{product.price.toLocaleString()} each)
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">
                            Qty:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => dec(product._id)}
                              disabled={loadingId === product._id || qty <= 1}
                              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                              {loadingId === product._id ? (
                                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                              ) : (
                                qty
                              )}
                            </span>
                            <button
                              onClick={() => inc(product._id)}
                              disabled={loadingId === product._id || qty >= 8}
                              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600 font-medium">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={paymenthandle}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => navigate("/Allproducts")}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-3">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-green-500" />
                  <span>Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;

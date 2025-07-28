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

const Cartpage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const cartDisplay = async () => {
    try {
      setLoading(true);
      const userid = localStorage.getItem("userid");
      if (!userid) {
        navigate("/auth/login");
        return;
      }
      const res = await axios.get(`http://localhost:8080/cart/view/${userid}`);
      setCart(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartDisplay();
  }, []);

  const removeitem = async (product) => {
    try {
      const productId = product._id;
      // const updatedCart = cart.filter((item) => item.id !== product.id);
      await axios.delete(`http://localhost:8080/cart/remove/${productId}`, {
        // cart: updatedCart,
      }); // Update cart in  backend

      // setCart(updatedCart); // Update state only after backend update
      cartDisplay();
      // the product id check to item id . and exclude matching product .  and return new arrAY TO updatecart.
      // it only remove from display
      toast.warning("Item removed from your cart");
      cartDisplay();
      // window.location.reload();      // setCart(updatedCart); // Update cart in state
    } catch (error) {
      console.log("Error removing item", error);
    }
  };

  const inc = async (id) => {
    if (loadingId === id) return;
    const product = cart.find((item) => item._id === id);
    if (product.qty >= 8) {
      toast.warning("Maximum quantity is 8");
      return;
    }
    setLoadingId(id);
    try {
      await axios.post(
        `http://localhost:8080/updatecart/update/${id}`,
        { action: "increment" },
        { withCredentials: true }
      );
      await cartDisplay();
    } catch (error) {
      toast.error("Failed to increment quantity");
    } finally {
      setLoadingId(null);
    }
  };

  const dec = async (id) => {
    if (loadingId === id) return;
    const product = cart.find((item) => item._id === id);
    if (product.qty <= 1) {
      toast.warning("Minimum quantity is 1");
      return;
    }
    setLoadingId(id);
    try {
      await axios.post(
        `http://localhost:8080/updatecart/update/${id}`,
        { action: "decrement" },
        { withCredentials: true }
      );
      await cartDisplay();
    } catch (error) {
      toast.error("Failed to decrement quantity");
    } finally {
      setLoadingId(null);
    }
  };

  const paymenthandle = () => {
    navigate("/payment");
  };

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
  const totalItems = cart.reduce((acc, product) => acc + product.qty, 0);

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        product.url || "/placeholder.svg?height=120&width=120"
                      }
                      alt={product.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg bg-gray-100"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeitem(product)}
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
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{(product.price * product.qty).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          (₹{product.price.toLocaleString()} each)
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">
                          Qty:
                        </span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => dec(product._id)}
                            disabled={
                              loadingId === product._id || product.qty <= 1
                            }
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                            {loadingId === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                            ) : (
                              product.qty
                            )}
                          </span>
                          <button
                            onClick={() => inc(product._id)}
                            disabled={
                              loadingId === product._id || product.qty >= 8
                            }
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
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
                {/* <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{Math.floor(totalPrice * 0.18).toLocaleString()}</span>
                </div> */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹
                      {(
                        totalPrice 
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={paymenthandle}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
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

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-green-500" />
                    <span>Free shipping on orders over ₹500</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <ShoppingCart className="w-4 h-4 text-green-500" />
                    <span>Easy 30-day returns</span> */}
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
    </div>
  );
};

export default Cartpage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Cartpage = () => {
//   const [cart, setCart] = useState([]);

//   const cartDisplay = async (user) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/cart/view/${user}`);

//       setCart(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     cartDisplay();
//   }, []);

//   //...................................

//   const removeitem = async (product) => {
//     try {
//       const productId = product._id;
//       // const updatedCart = cart.filter((item) => item.id !== product.id);
//       await axios.delete(`http://localhost:8080/cart/remove/${productId}`, {
//         // cart: updatedCart,
//       }); // Update cart in  backend

//       // setCart(updatedCart); // Update state only after backend update
//       cartDisplay();
//       // the product id check to item id . and exclude matching product .  and return new arrAY TO updatecart.
//       // it only remove from display
//       toast.warning("Item removed from your cart");
//       cartDisplay();
//       // window.location.reload();      // setCart(updatedCart); // Update cart in state
//     } catch (error) {
//       console.log("Error removing item", error);
//     }
//   };

//   //.......................................................

//   const nav = useNavigate();
//   const paymenthandle = () => {
//     nav("/payment");
//   };

//   // incr qty
//   const [loadingId, setLoadingId] = useState(null);

// const inc = async (id) => {
//   if (loadingId === id) return; // already processing

//   const product = cart.find((item) => item._id === id);
//   if (product.qty >= 8) {
//     toast.warning("Maximum quantity is 8");
//     return;
//   }

//   setLoadingId(id);
//   try {
//     await axios.post(
//       `http://localhost:8080/updatecart/update/${id}`,
//       { action: "increment" },
//       { withCredentials: true }
//     );
//     cartDisplay();
//   } catch (error) {
//     toast.error("Failed to increment");
//   } finally {
//     setLoadingId(null);
//   }
// };

//   const decrement = {
//     action: "decrement",
//   };
//   //dec qty
//   //CALCULATE TOTAL PRICE
//   console.log(cart, "cart");

//   const totalPrice = cart.reduce(
//     (acc, product) => acc + product.price * product.qty,
//     0
//   );

//   const dec = async (id) => {
//   if (loadingId === id) return; // already processing

//   const product = cart.find((item) => item._id === id);
//   if (product.qty <= 1) {
//     toast.warning("Minimum quantity is 1");
//     return;
//   }

//   setLoadingId(id);
//   try {
//     await axios.post(
//       `http://localhost:8080/updatecart/update/${id}`,
//       { action: "decrement" },
//       { withCredentials: true }
//     );
//     cartDisplay();
//   } catch (error) {
//     toast.error("Failed to decrement");
//   } finally {
//     setLoadingId(null);
//   }
// };
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Your Cart
//       </h1>
//       {cart.length > 0 ? (
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cart.map((product) => (
//               <div
//                 key={product._id}
//                 className="border rounded-lg shadow-lg p-6 flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
//               >
//                 <img
//                   src={product.url}
//                   alt={product.name}
//                   className="w-36 h-36 object-cover mb-4 rounded-lg shadow-md"
//                 />
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {product.name}
//                 </h2>
//                 <p className="text-gray-600 text-sm mt-2">
//                   Price: ₹{product.price * product.qty}
//                 </p>
//                 <div className="flex items-center space-x-4 mt-4">
//                   <button
//                    disabled={loadingId === product._id}
//                     onClick={() => inc(product._id)}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
//                   >
//                     +
//                   </button>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {product.qty}
//                   </h3>
//                   <button
//                    disabled={loadingId === product._id}
//                     onClick={() => dec(product._id)}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
//                   >
//                     -
//                   </button>
//                 </div>

//                 <button
//                   className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
//                   onClick={() => removeitem(product)}
//                 >
//                   Remove from Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Total Price Section */}
//           <div className="mt-6 text-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Total Price: ₹{totalPrice.toFixed(2)}
//             </h2>
//           </div>
//           {/* Place Order Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               className="w-full max-w-lg px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//               onClick={paymenthandle}
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-lg text-center text-gray-600">
//           No items in the cart.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Cartpage;

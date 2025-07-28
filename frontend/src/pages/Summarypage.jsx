import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  MapPin,
  Mail,
  Home,
  Truck,
} from "lucide-react";
import API_BASE_URL from "../config/apiconfig";

const Summarypage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  const [Odetails, setOdetails] = useState([]);
  const userId = localStorage.getItem("UserId");
  const email = localStorage.getItem("email");

  const gettotel = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orderdeatils/${userId}`);
      setOdetails(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettotel();
  }, []);

  const last = Odetails.length > 0 ? Odetails[Odetails.length - 1] : null;
  const pro = last ? last.products : [];
  const shipping = last?.shippingAddress || {};

  const price = pro.map((item) => item.price * item.qty);
  const total = price.reduce((acc, cur) => acc + cur, 0);

  const backclickhandle = () => {
    navigate("/");
  };
  const Tomyorder = () => {
    navigate("/myorders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ✅ Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase</p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* ✅ Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ✅ Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Order Information</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <p className="font-semibold text-gray-800">{last?.orderId || "N/A"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-semibold text-2xl text-green-600">₹{total.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            {pro.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <Package className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-800">Items Purchased</h2>
                  <span className="ml-auto bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {pro.length} {pro.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="space-y-4">
                  {pro.map((item, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="relative">
                        <img
                          src={item.image || item.url || "https://via.placeholder.com/100"}
                          alt={item.heading || "Product"}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.heading}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        <p className="text-sm text-gray-500">Price: ₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ✅ Right Column */}
          <div className="space-y-6">
            {/* Email Confirmation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Confirmation</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Confirmation sent to:</p>
                <p className="font-medium text-gray-800">{email || "N/A"}</p>
                <div className="flex items-center mt-3 text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Email sent successfully</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {shipping && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Shipping Address</h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                  <p className="font-medium">{shipping.housename}</p>
                  <p>{shipping.address}</p>
                  <p>{shipping.place}</p>
                  <p>{shipping.postOffice}, {shipping.district}</p>
                  <p>{shipping.state} - {shipping.pincode}</p>
                  <div className="flex items-center pt-2 border-t border-blue-200">
                    <span className="text-blue-600 mr-2">📞</span>
                    <span className="font-medium">{shipping.mobilenumber}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Delivery Info</h3>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Expected delivery:</p>
                <p className="font-semibold text-gray-800">3-5 business days</p>
                <p className="text-xs text-gray-500 mt-2">Tracking details will be shared soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={backclickhandle}
            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <button onClick={Tomyorder} className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300">
            <Package className="w-5 h-5 mr-2" />
            Track Order
          </button>
        </div>

        {/* ✅ Footer Thank You */}
        <div className="text-center mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <p className="text-gray-600 mb-2">🎉 Thank you for choosing us!</p>
          <p className="text-sm text-gray-500">We appreciate your trust and look forward to serving you again.</p>
        </div>
      </div>
    </div>
  );
};

export default Summarypage;

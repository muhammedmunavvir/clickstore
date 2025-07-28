import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/apiconfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSection = () => {
  const currentuseremail = localStorage.getItem("email");
  console.log(currentuseremail);
  const [details, setDetails] = useState({
    address: "",
    housename: "",
    place: "",
    postOffice: "",
    district: "",
    state: "",
    pincode: "",
    mobilenumber: "",
    email: currentuseremail,
    paymentmethod: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        address,
        housename,
        place,
        postOffice,
        district,
        state,
        pincode,
        mobilenumber,
        email,
        paymentmethod,
      } = details;

      // Optional frontend validation
      if (pincode.length !== 6) {
        toast.error("Pin code must be exactly 6 digits");
        setLoading(false);
        return;
      }

      if (mobilenumber.length !== 10) {
        toast.error("Mobile number must be exactly 10 digits");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/payment`, {
        shippingAddress: {
          address,
          housename,
          place,
          postOffice,
          district,
          state,
          pincode,
          mobilenumber,
          email,
        },
        paymentmethod,
      });

      const orderID = response.data.razorpay_order_id;

      if (paymentmethod === "UPI") {
        navigate("/razorpaycheckflow", {
          state: { totalAmount: response.data.totalAmount, orderID },
        });
      } else {
        navigate("/ordersum");
        toast.success("Payment successful");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Payment Section
      </h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-gray-700">
          Shipping address
        </h3>

        <form className="space-y-6" onSubmit={submitHandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Customer Name</label>
              <input
                name="address"
                value={details.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter your Name"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                House/Building Name
              </label>
              <input
                name="housename"
                value={details.housename}
                onChange={handleChange}
                type="text"
                placeholder="Enter your House Name/Building"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Place</label>
              <input
                name="place"
                value={details.place}
                onChange={handleChange}
                type="text"
                placeholder="Enter your Place"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Post Office</label>
              <input
                name="postOffice"
                value={details.postOffice}
                onChange={handleChange}
                type="text"
                placeholder="Enter your Post Office"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">District</label>
              <input
                name="district"
                value={details.district}
                onChange={handleChange}
                type="text"
                placeholder="Enter your District"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">State</label>
              <input
                name="state"
                value={details.state}
                onChange={handleChange}
                type="text"
                placeholder="Enter your State"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Pin code</label>
              <input
                name="pincode"
                value={details.pincode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,6}$/.test(value)) {
                    setDetails((prevDetails) => ({
                      ...prevDetails,
                      pincode: value,
                    }));
                  }
                }}
                type="text"
                inputMode="numeric"
                placeholder="Enter your Pin code"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Mobile Number</label>
              <input
                name="mobilenumber"
                value={details.mobilenumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setDetails((prevDetails) => ({
                      ...prevDetails,
                      mobilenumber: value,
                    }));
                  }
                }}
                type="text"
                inputMode="numeric"
                placeholder="Enter your Mobile Number"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2 ">Email</label>
              <input
                name="email"
                value={currentuseremail}
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md cursor-not-allowed hover:bg-gray-200 transition"
                readOnly
              />
              <p className="text-sm text-blue-600 mt-1 ">
                This email is used for sending order confirmations,
                cancellations, and other order-related updates. It cannot be
                edited.
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Select Payment Method
            </h4>
            <div className="space-y-3">
              {["UPI", "Card", "cash on delivery"].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentmethod"
                    value={method}
                    checked={details.paymentmethod === method}
                    onChange={handleChange}
                    className="form-radio text-blue-500"
                    required
                  />
                  <span className="text-gray-700">
                    {method === "cash" ? "Cash on Delivery" : method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Processing..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentSection;

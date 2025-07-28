import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import API_BASE_URL from "../config/apiconfig"; // Replace with your API config file path

export const Razorpaycheckoutpage = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const { totalAmount ,orderID} = location.state || {}; // Get the totalAmount from the state passed during navigation
 
  console.log("from payment setion",orderID)
  console.log("Total Amount:", totalAmount); // Check the totalAmount

  useEffect(() => {
    const initializeRazorpay = () => {
      if (!totalAmount) {
        alert("Total amount not found");
        return;
      }

      if (isNaN(totalAmount) || totalAmount <= 0) {
        alert("Invalid amount.");
        return;
      }

      console.log("Amount in INR:", totalAmount);
      console.log("Amount in paise:", totalAmount * 100); // Verify if conversion to paise is happening correctly

      const options = {
        key: "rzp_test_mT24oZA21qREv5", // Replace with your Razorpay key
        amount: totalAmount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
        currency: "INR",
        name: "Paw Palace",
        description: "Test Transaction",
        image: "", // Optional logo URL
        order_id:orderID,

        handler: async function (response) {
          console.log("Razorpay Response:", response);
        
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        
          console.log("Payment ID:", razorpay_payment_id);
          console.log("Order ID:", razorpay_order_id);  // Ensure this is correct
          console.log("Signature:", razorpay_signature);  // Ensure this is correct
        
          if (!razorpay_order_id || !razorpay_signature) {
            console.log("Order ID or Signature not found.");
            return; // Exit if order_id or signature is not available
          }
        
          try {
            // Send data to backend for verification
            const verifyResponse = await axios.post(
              `${API_BASE_URL}/api/verify-payment`, 
              {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              }
            );
        
            console.log("Payment Verification Response:", verifyResponse.data);
            if (verifyResponse.data.success) {
              toast.success("Payment verified successfully!");
              navigate("/ordersum")  
            } 
             
            else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed due to a server error.");
          }
         finally {
          // Explicitly close the Razorpay modal
          const razorpay = new window.Razorpay();
          razorpay.close();
        }
        },
        
          
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = initializeRazorpay; // Trigger checkout once the script is loaded
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, [totalAmount]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-xl font-bold">Redirecting to Razorpay...</h1>
    </div>
  );
};

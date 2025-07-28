import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";



const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign in with Google
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-black font-semibold py-3 rounded-md hover:bg-gray-100 gap-2"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          By signing in, you agree to our{" "}
          <NavLink to="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </NavLink>{" "}
          and{" "}
          <NavLink to="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </NavLink>.
        </p>
      </div>
    </div>
  );
};

export default Login;

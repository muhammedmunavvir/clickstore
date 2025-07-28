import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const [user, setuser] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    username: "",
    password: "",
    conformpassword: "",
    cart: [],
    orderdetails: [],
  });
  const {username,email,password,}=user
  const filterdbody={username,email,password,}

  const [error, seterror] = useState({});
  const nav = useNavigate();

  const clickhandle = (e) => {
    const { value, name } = e.target;
    setuser({ ...user, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.fullname) {
      errors.fullname = "Full name is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "email not valid";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Phone number is required";
    }
    if (!values.username) {
      errors.username = "User name is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.conformpassword !== values.password) {
      errors.conformpassword = "Passwords do not match";
    }

    seterror(errors);
    return Object.keys(errors).length === 0;
  };

  // email auth

  const [data, setData] = useState([]);

  useEffect(() => {
    const getd = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users`);
        setData(res.data);
      } catch {
        console.log("er");
      }
    };

    getd();
  }, []);

  const submithandle = async (e) => {
    e.preventDefault();

    if (validate(user)) {
      const exist = data.find((val) => val.email === user.email);

      if (exist) {
        alert("email id already taken");
      } else {
        try {
         console.log(user)
           await axios.post(
            "http://localhost:8080/auth/register",
            filterdbody
          );
          toast.success("Registration successful!");

          nav("/login");

          setuser({
            fullname:"",
            email:"",
            phonenumber:"",
            username:"",
            password:"",
            conformpassword:"",
          });
        } catch (error){
          console.log("error during registration",error);
        }
      }
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <form className="space-y-4" onSubmit={submithandle}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              onChange={clickhandle}
              value={user.fullname}
              name="fullname"
              type="text"
              placeholder="Full name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.fullname && (
              <p className="text-red-500 text-sm">{error.fullname}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              onChange={clickhandle}
              value={user.email}
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              onChange={clickhandle}
              value={user.phonenumber}
              name="phonenumber"
              type="tel"
              placeholder="phonenumber"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.phonenumber && (
              <p className="text-red-500 text-sm">{error.phonenumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              username
            </label>
            <input
              onChange={clickhandle}
              value={user.username}
              name="username"
              type="text"
              placeholder="username"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.username && (
              <p className="text-red-500 text-sm">{error.username}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={clickhandle}
              value={user.password}
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={clickhandle}
              value={user.conformpassword}
              name="conformpassword"
              type="password"
              placeholder="Confirm password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
            {error.conformpassword && (
              <p className="text-red-500 text-sm">{error.conformpassword}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the Terms and Conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to={"/login"} className="text-blue-600 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
      {/* Video Section
     <div className="mt-[-5] lg:mt-0 w-full lg:w-1/2 flex justify-center">
          <video
            src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
         
            autoPlay
            muted
            loop
            className="rounded-lg shadow-md w-full lg:w-auto max-w-md"
          />
        </div> */}
    </div>
  );
};

export default Register;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Userdetails = () => {
  const { id } = useParams();

  const [details, setdetails] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admin/userDetails/${id}`
        );
        console.log(res)
        setdetails(res.data.data);
      } catch {
        console.log("Error");
      }
    };
    getuser();
  }, []);

  // const filtered = details.filter((user) => user.id === id);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-start justify-start">
      <div className="flex flex-wrap">
        {details.map((user, index) => (
          <div
            key={index} // Using index if no unique identifier is needed
            className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden m-4 transition-transform transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-full h-32 flex items-center justify-center">
              <img
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                src={
                  user.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6xc8NsbrCg4sIXjqVe54jrWElkiqswSPyX9M9KrAK3gZnDKs-Uc7CYxt427ekCOFenTw&usqp=CAU"
                }
                alt="User avatar"
              />
            </div>
            <div className="p-6 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                {user.username}
              </h1>
              <p className="text-gray-600 text-sm mt-1"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 text-sm mt-1"><strong>Age:</strong> {user.age}</p>
              <p className="text-gray-600 text-sm mt-1"><strong>Role:</strong> {user.role}</p>
              <p className="text-gray-600 text-sm mt-1"><strong>Status:</strong> {user.status}</p>
              <p className="text-gray-600 text-sm mt-1">
                <strong>Cart:</strong> {user.cart.length > 0 ? user.cart.join(", ") : "No items in cart"}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  
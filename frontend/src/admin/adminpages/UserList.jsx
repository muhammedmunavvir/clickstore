import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserList = () => {
  const [users, setusers] = useState([]);

  const getuser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/allusers");
      setusers(res.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(users);
  useEffect(() => {
    getuser();
  }, []);

  const nav = useNavigate();
  const viewuser = (_id) => {
    nav(`/admin/userdetails/${_id}`);
  };

  const handleblock = async (id, action) => {
    try {
      await axios.patch(`http://localhost:8080/admin/blockAndunblock/${id}`, {
        action,
      });

      getuser();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">User List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium border-b">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded "
                      onClick={() => viewuser(user._id)}
                      key={user._id}
                    >
                      View
                    </button>
                    {user.status === "Active" ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 ml-3 rounded "
                        onClick={() => handleblock(user._id, "block")}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 ml-3 rounded "
                        onClick={() => handleblock(user._id, "unblock")}
                      >
                        unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Outlet, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// export const Addcat = () => {
//   const category=useParams()
//   const [cat, setcat] = useState([]);

//   const getcat = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/admin/products/category?category=cat`);
//       setcat(res.data);
//     } catch (error){
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getcat();
//   }, []);

//   // const catonly = cat.filter(
//   //   (item) => item.catogory === "cat-food" || item.catogory == "cat-treat"
//   // );
//   //for edit
//   const navigate = useNavigate();
//   const foredit = (id) => {
//     navigate(`/admin/editing/${id}`);
//   };
//   //for delete

//   const deletehandle = async (prod) => {
//     try {
//       await axios.delete(`http://localhost:5000/products/${prod.id}`);
//       getcat();
//       toast.warning("Item deleted");
//     } catch {
//       console.log("Error");
//     }
//   };

//   //new product add

//   const nav = useNavigate();

//   const newproduct = () => {
//     nav("/admin/addnewproduct");
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       {/* Title */}
//       <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
//         Cat Products
//       </h2>

//       <div className="flex justify-end mb-8">
//         <button
//           className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
//           onClick={newproduct}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-1"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//           Add Products
//         </button>
//       </div>

//       {/* Grid layout for 4 products in one row */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {cat.map((prod) => (
//           <div
//             key={prod.id}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
//           >
//             {/* Product Image */}
//             <div className="relative">
//               <img
//                 src={prod.url}
//                 alt={prod.heading}
//                 className="w-full h-64 object-cover rounded-t-xl"
//               />
//               {/* Image overlay for product title */}
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <h1 className="text-2xl font-bold text-white text-center px-4">
//                   {prod.heading}
//                 </h1>
//               </div>
//             </div>

//             {/* Product Content */}
//             <div className="p-6">
//               {/* Price and Rating */}
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-gray-600 font-semibold">
//                   Price: ${prod.price}
//                 </p>
//                 <p className="text-yellow-500 font-medium">
//                   Rating: {prod.rating} ★
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-between space-x-3">
//                 <button
//                   onClick={() => foredit(prod.id)}
//                   className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
//                   onClick={() => deletehandle(prod)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <div>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

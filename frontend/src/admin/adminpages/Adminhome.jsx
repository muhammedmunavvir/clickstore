import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const Adminhome = () => {
  const nav = useNavigate();
  const role = localStorage.getItem("userrole");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (role !== "admin") {
      nav("/");
    }
  }, [role, nav]);

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "#5d6e6e" }}>
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4" style={{ background: "#255c4f" }}>
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <aside
        className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 text-white flex flex-col p-6`}
        style={{ background: "#255c4f" }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center hidden md:block">Admin Panel</h1>
        <nav className="flex flex-col space-y-2 md:space-y-4">
          <NavLink
            to="dashboard"
            className="px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="userlist"
            className="px-4 py-2 rounded hover:bg-green-500 transition duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            All Users
          </NavLink>
          <NavLink
            to="allproducts"
            className="px-4 py-2 rounded hover:bg-yellow-500 transition duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            All products
          </NavLink>
          <NavLink
            to="addnewproduct"
            className="px-4 py-2 rounded hover:bg-purple-500 transition duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            Add new product
          </NavLink>
          <button
            onClick={logout}
            className="self-start px-4 py-2 rounded hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header
          className="rounded-lg shadow p-4 md:p-6 mb-4 md:mb-8"
          style={{
            backgroundImage: 'url("https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?s=1024x1024&w=is&k=20&c=JZprgGDQ8xqa6iu0fyKJfKOlAvae0w9U-AdHeCT2kg4=")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "150px",
            color: "white",
          }}
        >
          <h2 className="text-xl md:text-2xl font-semibold">Welcome to the Admin Panel</h2>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Manage your application efficiently.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
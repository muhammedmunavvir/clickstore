"use client"

import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Search, ShoppingCart, Menu, X, User, Package, LogOut } from "lucide-react"

export const Navbar = () => {
  const [searchitem, setsearchitem] = useState("")
  const [products, setproducts] = useState([])
  const [filtered, setfilter] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/all")
        setproducts(response.data.data)
      } catch (error) {
        console.log("Error fetching products", error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const filterdata = products.filter((item) => item.heading?.toLowerCase().includes(searchitem?.toLowerCase()))
    setfilter(filterdata)
  }, [searchitem, products])

  const handleItemClick = (item) => {
    setsearchitem(item.heading)
    fordetails(item._id)
  }

  const fordetails = (id) => {
    setsearchitem("")
    setIsSearchFocused(false)
    navigate(`/productdetails/${id}`)
  }

  const nav = useNavigate()
  const [cart, setcart] = useState([])
  const userid = localStorage.getItem("userid")

  const getcart = async () => {
    if (userid) {
      try {
        const res = await axios.get(`http://localhost:8080/cart/view/${userid}`)
        setcart(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getcart()
  }, [])

  function logout() {
    localStorage.clear()
    toast.info("You have been logged out.")
    nav("/")
  }

  const uName = localStorage.getItem("userid")
  const userpicture = localStorage.getItem("userpicture")

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSearchBlur = () => {
    // Delay to allow click on search results
    setTimeout(() => setIsSearchFocused(false), 200)
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition-colors duration-200"
            >
              Clickstore
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-teal-600 border-b-2 border-teal-600 pb-1" : "text-gray-700 hover:text-teal-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Allproducts"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-teal-600 border-b-2 border-teal-600 pb-1" : "text-gray-700 hover:text-teal-600"
                }`
              }
            >
              Products
            </NavLink>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200"
                  value={searchitem}
                  onChange={(e) => setsearchitem(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </div>

              {/* Search Results Dropdown */}
              {(isSearchFocused || searchitem) && searchitem && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg max-h-64 overflow-y-auto z-50">
                  {filtered.map((item) => (
                    <div
                      key={item._id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      onClick={() => handleItemClick(item)}
                    >
                      <p className="text-sm font-medium text-gray-900">{item.heading}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            {uName && (
              <NavLink
                to="/cartpage"
                className="relative p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            )}

            {/* My Orders */}
            {uName && (
              <NavLink
                to="/myorders"
                className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors duration-200"
              >
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Orders</span>
              </NavLink>
            )}

            {/* User Section */}
            {uName ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {userpicture ? (
                    <img
                      src={userpicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  value={searchitem}
                  onChange={(e) => setsearchitem(e.target.value)}
                />
                {searchitem && filtered.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg max-h-48 overflow-y-auto z-50">
                    {filtered.map((item) => (
                      <div
                        key={item._id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleItemClick(item)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <p className="text-sm font-medium text-gray-900">{item.heading}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <NavLink
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/Allproducts"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </NavLink>

              {uName && (
                <>
                  <NavLink
                    to="/cartpage"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {cart.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </NavLink>
                  <NavLink
                    to="/myorders"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    My Orders
                  </NavLink>
                </>
              )}

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {uName ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      {userpicture ? (
                        <img
                          src={userpicture || "/placeholder.svg"}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-900">Profile</span>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/auth/login"
                    className="block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-teal-700 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

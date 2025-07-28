"use client"

import axios from "axios"
import API_BASE_URL from "../config/apiconfig"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  Loader2,
  Star,
  Calendar,
  ShoppingBag,
  ArrowRight,
} from "lucide-react"

export const Myorders = () => {
  const [myorders, setMyorders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancellingOrderId, setCancellingOrderId] = useState(null)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Getmyorder = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE_URL}/user/myorders`)
      console.log(res.data)
      setMyorders(res.data.data || [])
    } catch (error) {
      console.log(error)
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Getmyorder()
  }, [])

  const ordercancel = async (orderId) => {
    setCancellingOrderId(orderId)
    try {
      const res = await axios.patch(`${API_BASE_URL}/user/cancelorder/${orderId}`)
      toast.success("Order cancelled successfully!")
      setMyorders((prevOrders) =>
        prevOrders.map((order) => (order.orderId === orderId ? { ...order, status: "Cancelled" } : order)),
      )
    } catch (error) {
      console.log(error)
      toast.error("Failed to cancel order.")
    } finally {
      setCancellingOrderId(null)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case "Packing":
        return <Package className="w-5 h-5 text-purple-600" />
      case "Shipped":
        return <Truck className="w-5 h-5 text-indigo-600" />
      case "Out for delivery":
        return <Truck className="w-5 h-5 text-orange-600" />
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Order confirmed":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Packing":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200"
      case "Out for delivery":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200"
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusProgress = (status) => {
    switch (status) {
      case "Order confirmed":
        return 25
      case "Packing":
        return 50
      case "Shipped":
        return 75
      case "Out for delivery":
        return 90
      case "Completed":
        return 100
      case "Cancelled":
        return 0
      default:
        return 0
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (myorders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button
              onClick={() => (window.location.href = "/Allproducts")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">My Orders</h1>
          <p className="text-gray-600 text-lg">
            Track and manage your {myorders.length} {myorders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {myorders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order ID</p>
                      <p className="font-mono text-lg font-bold text-gray-900">{order.orderId}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Status</p>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {order.status !== "Cancelled" && (
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-500 mb-2">Progress</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getStatusProgress(order.status)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{getStatusProgress(order.status)}% Complete</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Order Date</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    {order.status !== "Cancelled" && order.status === "Order confirmed" && (
                      <button
                        onClick={() => ordercancel(order.orderId)}
                        disabled={cancellingOrderId === order.orderId}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                      >
                        {cancellingOrderId === order.orderId ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Cancelling...</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Cancel Order</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                {/* Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Items</p>
                        <p className="text-xl font-bold text-gray-900">{order.products.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-green-600">₹{order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment</p>
                        <p className="text-lg font-semibold text-gray-900">{order.paymentmethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                    className="w-full flex items-center justify-between text-left mb-4 hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-900">Order Details</span>
                    <ArrowRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        expandedOrder === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedOrder === index && (
                    <div className="space-y-8 animate-in slide-in-from-top-2 duration-300">
                      {/* Shipping Address */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <span>Shipping Address</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 text-gray-700">
                            <p className="font-medium">{order.shippingAddress.housename}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.place}, {order.shippingAddress.postOffice}
                            </p>
                            <p>
                              {order.shippingAddress.district}, {order.shippingAddress.state}
                            </p>
                            <p className="font-medium">PIN: {order.shippingAddress.pincode}</p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{order.shippingAddress.mobilenumber}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{order.shippingAddress.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Products */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Ordered Items ({order.products.length})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {order.products.map((product, i) => (
                            <div
                              key={i}
                              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-200 group"
                            >
                              <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100 group-hover:scale-105 transition-transform duration-200">
                                <img
                                  src={product.url || "/placeholder.svg?height=200&width=200"}
                                  alt={product.heading}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.heading}</h4>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.discription}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">Category</span>
                                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                    {product.catogory}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-indigo-600">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    {renderStars(product.rating)}
                                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

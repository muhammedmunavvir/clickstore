import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/apiconfig";
import jsPDF from "jspdf";

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-semibold ${
        statusStyles[status] || statusStyles.default
      }`}
    >
      {status}
    </span>
  );
};

// PDF generation utility
const generateOrderPDF = async (orderId, orderData) => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    let y = margin;

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(40, 40, 40);
    pdf.text("ORDER INVOICE", pdfWidth / 2, y, { align: "center" });
    y += 10;

    // Order Info
    const createdDate = new Date(orderData.createdAt);
    const day = createdDate.getDate().toString().padStart(2, "0");
    const month = createdDate.toLocaleString("default", { month: "long" }); // "July"
    const year = createdDate.getFullYear();
    const formattedDate = `${day}-${month.toLowerCase()}-${year}`;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Order ID: ${orderData.orderId || orderData._id}`, margin, y);
    pdf.text(`Date: ${formattedDate}`, pdfWidth - margin, y, {
      align: "right",
    });
    y += 8;

    // Divider
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, pdfWidth - margin, y);
    y += 5;

    // Pickup Address
    pdf.setFont("helvetica", "bold");
    pdf.text("Pickup Address", margin, y);
    pdf.setFont("helvetica", "normal");
    y += 6;

    const pickupAddressLines = [
      "CLICKSTORE",
      "Koolivayal, Cherukattoor (PO)",
      "Wayanad, Kerala - 670721",
      "Email: clickstorea2z@gmail.com",
      "TRN: 322400002305ES2",
      "FSSAI: 21320247000337",
    ];

    pickupAddressLines.forEach((line) => {
      if (y > 250) {
        // Check if we're near the bottom
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 5;
    });

    y += 5;

    // Shipping Address
    const a = orderData.shippingAddress || {};
    pdf.setFont("helvetica", "bold");
    pdf.text("Shipping Address", margin, y);
    pdf.setFont("helvetica", "normal");
    y += 6;

    const shippingAddressLines = [
      `Name: ${a.address || ""}`,
      `House: ${a.housename || ""}`,
      `Place: ${a.place || ""}`,
      `Post Office: ${a.postOffice || ""}`,
      `District: ${a.district || ""}`,
      `State: ${a.state || ""}`,
      `Pincode: ${a.pincode || ""}`,
      `Phone: ${a.mobilenumber || ""}`,
      `Email: ${a.email || ""}`,
    ];

    shippingAddressLines.forEach((line) => {
      if (y > 250) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 5;
    });

    y += 5;

    // Products Header
    pdf.setFont("helvetica", "bold");
    pdf.text(`Products (${orderData.products.length})`, margin, y);
    y += 6;

    // Product Table Header
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, y, pdfWidth - margin * 2, 7, "F");
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text("#", margin + 1, y + 5);
    pdf.text("Product", margin + 20, y + 5);
    pdf.text("Category", 100, y + 5);
    pdf.text("Qty", 140, y + 5);
    pdf.text("Price", pdfWidth - margin - 5, y + 5, { align: "right" });
    y += 7;

    // Product Rows
    pdf.setFont("helvetica", "normal");
    orderData.products.forEach((p, i) => {
      if (y > 250) {
        pdf.addPage();
        y = margin;
        // Redraw table header if we're on a new page
        pdf.setFillColor(245, 245, 245);
        pdf.rect(margin, y, pdfWidth - margin * 2, 7, "F");
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text("#", margin + 1, y + 5);
        pdf.text("Product", margin + 20, y + 5);
        pdf.text("Category", 100, y + 5);
        pdf.text("Qty", 140, y + 5);
        pdf.text("Price", pdfWidth - margin - 5, y + 5, { align: "right" });
        y += 7;
      }

      pdf.text(`${i + 1}`, margin + 1, y + 5);
      pdf.text(p.heading, margin + 20, y + 5, { maxWidth: 70 });
      pdf.text(p.catogory, 100, y + 5, { maxWidth: 35 });
      pdf.text(`${p.qty || 1}`, 140, y + 5);
      pdf.text(`${p.price}`, pdfWidth - margin - 5, y + 5, { align: "right" });
      y += 6;

      // Add small divider between products
      if (i < orderData.products.length - 1) {
        pdf.setDrawColor(230, 230, 230);
        pdf.line(margin, y + 1, pdfWidth - margin, y + 1);
        y += 3;
      }
    });

    // Ensure we have space for payment summary
    if (y > 200) {
      pdf.addPage();
      y = margin;
    }

    // Payment Summary
    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Payment Summary", margin, y);
    y += 6;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Payment Method: ${orderData.paymentmethod}`, margin, y);
    y += 5;

    if (orderData.razorpayOrderId) {
      pdf.text(`Razorpay Order ID: ${orderData.razorpayOrderId}`, margin, y);
      y += 5;
    }

    y += 5;

    // Total Amount Box
    const totalAmount = parseFloat(orderData.totalAmount || 0);

    // Add background box
    pdf.setFillColor(245, 245, 245);
    const boxHeight = 14;
    const boxWidth = pdfWidth - margin * 2;
    pdf.rect(margin, y, boxWidth, boxHeight, "F");

    // Correctly render Rupee symbol using Unicode
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(30, 30, 30);

    // Use Unicode ₹ and add spacing
    // const rupeeSymbol = '\u20B9'; // Unicode for ₹

    pdf.text(
      `Total Amount: ${totalAmount.toLocaleString("en-IN")}`,
      margin + 5,
      y + 9
    );

    y += boxHeight + 5;

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(
      "Thank you for shopping with us!",
      pdfWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );

    pdf.save(`order-${orderId}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
};

// Shipping Address Component
const ShippingAddress = ({ address }) => (
  <div className="text-gray-700 leading-6">
    <p>
      <strong>Name:</strong> {address?.address}
    </p>
    <p>
      <strong>House:</strong> {address?.housename}
    </p>
    <p>
      <strong>Place:</strong> {address?.place}
    </p>
    <p>
      <strong>Post Office:</strong> {address?.postOffice}
    </p>
    <p>
      <strong>District:</strong> {address?.district}
    </p>
    <p>
      <strong>State:</strong> {address?.state}
    </p>
    <p>
      <strong>Pincode:</strong> {address?.pincode}
    </p>
    <p className="mt-2 text-sm">📞 {address?.mobilenumber}</p>
    <p className="text-sm">📧 {address?.email}</p>
  </div>
);

// Product Card
const ProductCard = ({ product }) => (
  <div className="min-w-[140px] bg-gray-50 rounded-lg p-2 border shadow-sm">
    <img
      src={product.url}
      alt={product.heading}
      className="w-full h-24 object-cover rounded mb-2"
    />
    <p className="text-sm font-medium line-clamp-1">{product.heading}</p>
    <p className="text-xs text-gray-500">Category: {product.catogory}</p>
    <p className="text-xs font-semibold">Qty: {product.qty || 1}</p>
  </div>
);

// Main Orders Component
export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/admin/gettotalorders`
        );
        setOrders(data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDownloadPDF = async (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (order) {
      await generateOrderPDF(orderId, order);
    }
  };

  const statusColors = {
    Packing: "bg-yellow-300 hover:bg-yellow-400 text-yellow-900",
    Shipped: "bg-blue-300 hover:bg-blue-400 text-blue-900",
    "Out for Delivery": "bg-orange-300 hover:bg-orange-400 text-orange-900",
    Completed: "bg-green-300 hover:bg-green-400 text-green-900",
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/admin/update-order-status/${orderId}`,
        { status }
      );
      console.log("Status updated:", res.data);

      // Optional: Refresh orders after update
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-sm text-gray-500">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No orders found in the system.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      Order #{order.orderId || order._id}
                      <StatusBadge status={order.status} />
                    </h3>
                    {new Date(order.createdAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/\s/g, "-")}
                  </div>

                  {order.status !== "Cancelled" && (
                    <div>
                      {[
                        "Packing",
                        "Shipped",
                        "Out for Delivery",
                        "Completed",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateOrderStatus(order._id, s)}
                          className={`text-xs px-2 py-1 rounded mr-1 transition font-medium ${
                            statusColors[s] ||
                            "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadPDF(order._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      PDF
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">
                        Payment
                      </h4>
                      <p className="text-gray-700">
                        {order.paymentmethod} • ₹
                        {order.totalAmount?.toLocaleString()}
                      </p>
                      {order.razorpayOrderId && (
                        <p className="text-xs text-gray-500 mt-1">
                          Razorpay ID: {order.razorpayOrderId}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">
                        Shipping Address
                      </h4>
                      <ShippingAddress address={order.shippingAddress} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                      Products ({order.products.length})
                    </h4>
                    <div className="flex gap-3 overflow-x-auto pb-3">
                      {order.products.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

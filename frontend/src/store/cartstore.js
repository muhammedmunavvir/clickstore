import { create } from "zustand";
import API_BASE_URL from "../config/apiconfig";
import axios from "axios";

export const useCartstore = create((set) => ({
  cart: [],

  setCart: (items) => set({ cart: items }),

  fetchCart: async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/cart/view/${userId}`);
      set({ cart: res.data.data });

      return true;
    } catch (err) {
      console.error("Cart fetch error", err);
      return false;
    }
  },

  addItem: async (productId) => {
    const userId = localStorage.getItem("userid");
    await axios.post(`${API_BASE_URL}/cart/add/${productId}`);
    const res = await axios.get(`${API_BASE_URL}/cart/view/${userId}`);
    set({ cart: res.data.data });
  },

  removeItem: async (productId) => {
    const userId = localStorage.getItem("userid");

    set((state) => ({
      cart: state.cart.filter((item) => item._id !== productId),
    }));

    try {
      const deleteRes = await axios.delete(
        `${API_BASE_URL}/cart/remove/${productId}`
      );
      console.log("Backend delete response:", deleteRes.data);

      const res = await axios.get(`${API_BASE_URL}/cart/view/${userId}`);
      console.log("Fetched cart after delete:", res.data.data);
      set({ cart: res.data.data });
    } catch (err) {
      console.error("Remove error", err);
    }
  },

  updateQty: async (productId, action) => {
  const userId = localStorage.getItem("userid");

  try {
    await axios.post(
      `${API_BASE_URL}/updatecart/update/${productId}`,
      { action, userId },
      { withCredentials: true }
    );
 
    // ✅ Fetch the updated cart from backend
    const res = await axios.get(`${API_BASE_URL}/cart/view/${userId}`);
    set({ cart: res.data.data });
  } catch (err) {
    console.error("Cart update error:", err);
  }
}, 

clearCart: () => set(() => ({
    cart: [],
    cartCount: 0,
  })),
}));

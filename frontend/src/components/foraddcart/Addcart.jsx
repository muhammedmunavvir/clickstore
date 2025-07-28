import { toast } from "react-toastify";
import axios from "axios";

export const carthandle = async (product) => {
  const productId = product._id;
  console.log(productId);
  const user = localStorage.getItem("userid");

  if (user) {
    try {
      const res = await axios.post(
        `http://localhost:8080/cart/add/${productId}`
      );
      console.log(res);
      toast.success("Item successfully added to the cart!");

      window.location.reload();
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data.message === "This item is already in your cart"
      ) {
        toast.info("Item is already in your cart!");
      } else {
        toast.error("Something went wrong while adding the item to the cart.");
      }
    }
  } else {
    toast.error("User not logged in.");
  }
};

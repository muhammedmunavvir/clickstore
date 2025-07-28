import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const AuthRedirect = () => {
  console.log("hoooi:", document.cookie);
  console.log("Document.cookie:", document.cookie);

  
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token"); // read token from cookie
    console.log(token,"tooken");
    if (token) {
      try {
        console.log("hoooi");
        const decoded = jwtDecode(token);
        console.log(decoded, "decode token");

        // Save user info in localStorage
        localStorage.setItem("userid", decoded.id); // use `id` instead of `_doc._id`
        localStorage.setItem("userrole", decoded.role); // use `role` instead of `_doc.role`
        localStorage.setItem("userpicture", decoded.picture);
        localStorage.setItem("email", decoded.email);

        if (decoded.role === "admin") {
          navigate("/admin");
          toast.success("Logged in with Google successfully!");
        } else {
          toast.success("Logged in with Google successfully!");
          navigate("/"); // redirect to home or dashboard
        }
      } catch (err) {
        console.log(err);
        toast.error("Invalid token");
        navigate("/auth/login");
      }
    } else {
      toast.error("No token found");
      navigate("/auth/login");
    }
  }, []);
  

  return <div>Logging you in...</div>;
};

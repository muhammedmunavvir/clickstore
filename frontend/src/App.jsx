import "./App.css";

import HomePage from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Registerpage";
import { Allproducts } from "./pages/Allproducts";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Productdetails from "./components/details/Productdetails";
import Cartpage from "./pages/Cartpage";
import Paymentsection from "./pages/Paymentsection";
import Summarypage from "./pages/Summarypage";

import { Adminhome } from "./admin/adminpages/Adminhome";
import { Dashboard } from "./admin/adminpages/Dashboard";
import { UserList } from "./admin/adminpages/UserList";
import { Category } from "./admin/adminpages/Category";
import { Editing } from "./admin/adminpages/Editing";
import { Addnewproduct } from "./admin/adminpages/Addnewproduct";
import { Userdetails } from "./admin/adminpages/Userdetails";
import Categorypage from "./pages/Categorypage";
import { Razorpaycheckoutpage } from "./pages/Razorpaycheckflow";
import { Orders } from "./admin/adminpages/Totalorders";
import { Myorders } from "./pages/Myorders";
import { AuthRedirect } from "./Login/authurl";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // ✅ Needed for styling


//adimin section

function App() {
  const location = useLocation();
  const forhide = location.pathname.startsWith("/admin");
  
  return (
    <div>

      <ToastContainer
  position="top-right"
  autoClose={2000}          
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
      {!forhide && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/gettingcookie" element={<AuthRedirect />} />
        <Route path="/registerpage" element={<Register />} />
        <Route path="/Allproducts" element={<Allproducts />} />
        <Route path="/products/:category" element={<Categorypage />} />
        <Route path="/productdetails/:id" element={<Productdetails />} />
        <Route path="/cartpage" element={<Cartpage />} />
        <Route path="/myorders" element={<Myorders/>}/>
        <Route path="/payment" element={<Paymentsection />} />
        <Route path="/ordersum" element={<Summarypage />} />
        <Route path="/razorpaycheckflow" element={<Razorpaycheckoutpage />} />

        {/* //admib */}

        <Route path="/admin" element={<Adminhome />}>
          <Route index element={<Dashboard />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="allproducts" element={<Category />} />
          {/* <Route path="cat" element={<Addcat />} />
            <Route path="dog" element={<Adddog />} />{" "} */}

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="editing/:pID" element={<Editing />} />
          <Route path="addnewproduct" element={<Addnewproduct />} />
          <Route path="orders" element={<Orders/>} />
       
          <Route path="userdetails/:id" element={<Userdetails />} />
        </Route>
      </Routes>
      {!forhide && <Footer />}
        
    </div>
  );
}

export default App;

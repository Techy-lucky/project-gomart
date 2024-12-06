import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./files/welcome/Welcome";
import Unknown from "./files/admin/Unknown";
import Adminregist from "./files/admin/Adminregist";
import Navbar from "./files/user/navbar";  // Changed casing to match file system
import Homepage from "./files/user/Homepage";
import PageNotFound from "./files/welcome/PageNotFound";
import Uregister from "./files/user/Uregister";
import Ulogin from "./files/user/Ulogin";
import Adminlogin from "./files/admin/Adminlogin";
import Adminhome from "./files/admin/Adminhome";
import Profile from "./files/user/Profile";
import Cart from "./files/user/Cart";
import Adminnavbar from "./files/admin/Adminnavbar";
import "./App.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/unknown', '/adminregister', '/adminlogin', '/register', '/login'];
  const currentPath = location.pathname;
  
  // Hide navbar for specified paths and any unknown routes (404)
  if (hideNavbarPaths.includes(currentPath) || !(['/homepage', '/cart', '/profile'].includes(currentPath))) {
    return null;
  }

  return <Navbar />;
}

function AdminNavbarWrapper() {
  const location = useLocation();
  const showAdminNavbarPaths = ['/admindashboard'];
  const currentPath = location.pathname;

  // Only show admin navbar for admin dashboard
  if (!showAdminNavbarPaths.includes(currentPath)) {
    return null;
  }

  return <Adminnavbar />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId="137441948802-u3aq2e3ebrvdq664i0mg1ugj0mo338lr.apps.googleusercontent.com">
      <BrowserRouter>
        <NavbarWrapper />
        <AdminNavbarWrapper />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/unknown" element={<Unknown />} />
          <Route path="/adminregister" element={<Adminregist />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/register" element={<Uregister />} />
          <Route path="/login" element={<Ulogin />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admindashboard" element={<Adminhome />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

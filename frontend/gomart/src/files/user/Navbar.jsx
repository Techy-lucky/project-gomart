import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo/final.png";
import LogoutButton from "./LogoutButton";
import profile from "../../images/icon/user-stroke-rounded.svg";
import home from "../../images/icon/home-07-stroke-rounded.svg";
import allproducts from "../../images/icon/border-all-01-stroke-rounded.svg";
import cart from "../../images/icon/shopping-cart-add-01-stroke-rounded.svg";
import about from "../../images/icon/1st-bracket-square-stroke-rounded.svg";
import feedback from "../../images/icon/star-stroke-rounded.svg";
import search from "../../images/icon/search-01-stroke-rounded.svg";

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="bg-white/20 backdrop-blur-md border border-gray-200/40 shadow-lg rounded-full mx-4 mt-4 font-outfit overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between h-14">
                    <div className="flex items-center">
                        <Link to="/homepage" className="flex-shrink-0">
                            <img src={logo} alt="Gomart Logo" className="h-8 w-auto"/>
                        </Link>
                    </div>
                    
                    <div className="hidden sm:flex sm:items-center sm:space-x-2">
                        <Link to="/search" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/search' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={search} alt="Search" className="w-4 h-4 mr-1.5"/>
                            <span>Search</span>
                        </Link>
                        <Link to="/homepage" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/homepage' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={home} alt="Home" className="w-4 h-4 mr-1.5"/>
                            <span>Home</span>
                        </Link>
                        <Link to="/allproducts" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/allproducts' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={allproducts} alt="All Products" className="w-4 h-4 mr-1.5"/>
                            <span>All Products</span>
                        </Link>
                        <Link to="/cart" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/cart' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={cart} alt="Cart" className="w-4 h-4 mr-1.5"/>
                            <span>Cart</span>
                        </Link>
                        <Link to="/about" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/about' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={about} alt="About" className="w-4 h-4 mr-1.5"/>
                            <span>About</span>
                        </Link>
                        <Link to="/feedback" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/feedback' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={feedback} alt="Feedback" className="w-4 h-4 mr-1.5"/>
                            <span>Feedback</span>
                        </Link>
                        <Link to="/profile" className={`text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 hover:no-underline ${
                            currentPath === '/profile' ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
                        }`}>
                            <img src={profile} alt="Profile" className="w-4 h-4 mr-1.5"/>
                            <span>Profile</span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
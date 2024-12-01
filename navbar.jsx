import { Link } from "react-router-dom";
import logo from "../images/logo/final.png";
import ThemeToggle from "./ThemeToggle";
import profile from "../images/icon/user-stroke-rounded.svg";
import home from "../images/icon/home-07-stroke-rounded.svg";
import allproducts from "../images/icon/border-all-01-stroke-rounded.svg";
import cart from "../images/icon/shopping-cart-add-01-stroke-rounded.svg";
import about from "../images/icon/1st-bracket-square-stroke-rounded.svg";
import feedback from "../images/icon/star-stroke-rounded.svg";
import search from "../images/icon/search-01-stroke-rounded.svg";

const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg mx-4 mt-4 font-outfit">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/homepage" className="flex-shrink-0">
                            <img src={logo} alt="Gomart Logo" className="h-8 w-auto"/>
                        </Link>
                    </div>
                    
                    <div className="hidden sm:flex sm:items-center sm:space-x-6">
                        <Link to="/search" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={search} alt="Search" className="w-4 h-4 mr-2"/>
                            <span>Search</span>
                        </Link>
                        <Link to="/homepage" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={home} alt="Home" className="w-4 h-4 mr-2"/>
                            <span>Home</span>
                        </Link>
                        <Link to="/allproducts" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={allproducts} alt="All Products" className="w-4 h-4 mr-2"/>
                            <span>All Products</span>
                        </Link>
                        <Link to="/cart" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={cart} alt="Cart" className="w-4 h-4 mr-2"/>
                            <span>Cart</span>
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={about} alt="About" className="w-4 h-4 mr-2"/>
                            <span>About</span>
                        </Link>
                        <Link to="/feedback" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={feedback} alt="Feedback" className="w-4 h-4 mr-2"/>
                            <span>Feedback</span>
                        </Link>
                        <Link to="/profile" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                            <img src={profile} alt="Profile" className="w-4 h-4 mr-2"/>
                            <span>Profile</span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
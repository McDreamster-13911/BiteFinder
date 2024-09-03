import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameLogin, setBtnNameLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const [btnNameLoginStatus, setBtnNameLoginStatus] = useState(`${btnNameLogin} 🟢`);

  const loggedInUser = useContext(UserContext);
 

  const handleLoginClick = () => {
    setBtnNameLogin((prevName) =>
      prevName === "Login" ? "Logout" : "Login"
    );
  };

  // Subscribing to the store using a Selector
  // This selector helps to identify and select only the relevant portion of the store
  const cartItems = useSelector((store) => store.cart.items)
 // This above cartItems will contain the data of the items in the store


  useEffect(() => {
    setBtnNameLoginStatus(`${btnNameLogin} ${onlineStatus ? "🟢" : "🔴"}`);
  }, [btnNameLogin, onlineStatus]);

  return (
    <div className="flex items-center justify-between p-3 bg-yellow-50 shadow-md">
      <div className="flex items-center">
        <img className="w-24 h-29 rounded-3xl" src={LOGO_URL} alt="Logo" />
        <span className="ml-4 text-lg alex-brush-regular text-gray-800">
          Discover Your Next Favorite Bite
        </span>      </div>
      <div className="flex items-center space-x-4">
        <ul className="flex space-x-4 items-center">
          <li>
            <Link className="px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-700 rounded-md transition duration-300" to="/"> Home </Link>
          </li>
          <li>
            <Link className="px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-700 rounded-md transition duration-300" to="/about"> About Us</Link>
          </li>
          <li>
            <Link className="px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-700 rounded-md transition duration-300" to="/contact"> Contact Us</Link>
          </li>
          <li><Link className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-100 cursor-pointer" to="/cart">Cart ({cartItems.length} items) </Link></li>
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md transition duration-300 hover:bg-gray-100" onClick={handleLoginClick}>
          {btnNameLoginStatus} 
          {/* <li>{loggedInUser}</li> */}
        </button>
        </ul>
        
        
      </div>
    </div>
  );
};

export default Header;

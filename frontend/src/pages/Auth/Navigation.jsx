import { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineTags,
  AiOutlineOrderedList,
  AiOutlineTeam,
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Add debugging logs
  console.log('Navigation - userInfo:', userInfo);
  console.log('Navigation - isAdmin:', userInfo?.isAdmin);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? 'hidden' : 'flex'
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{' '}
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{' '}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{' '}
        </Link>

        {/* Favourite */}
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{' '}
        </Link>
      </div>

      <div className="mt-auto">
        {userInfo ? (
          <div className="relative">
            <div className="flex items-center">
              <span className="text-white">{userInfo.username}</span>

              <button onClick={toggleDropdown} className="ml-1 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${dropdownOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown menu - positioned above the button */}
            {dropdownOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-10">
                {/* Admin menu items */}
                {userInfo && userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <AiOutlineDashboard className="mr-2" size={18} />
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/productlist"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <AiOutlineAppstore className="mr-2" size={18} />
                      Products
                    </Link>
                    <Link
                      to="/admin/categorylist"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <AiOutlineTags className="mr-2" size={18} />
                      Categories
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <AiOutlineOrderedList className="mr-2" size={18} />
                      Orders
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      <AiOutlineTeam className="mr-2" size={18} />
                      Users
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                  </>
                )}

                {/* Common menu items for all users */}
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  <AiOutlineUser className="mr-2" size={18} />
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  <AiOutlineUserAdd className="mr-2" size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <ul>
            <li>
              {/* LOGIN */}
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="hidden nav-item-name">Login</span>{' '}
              </Link>
            </li>
            <li>
              {/* REGISTER */}
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2" size={26} />
                <span className="hidden nav-item-name">Register</span>{' '}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;

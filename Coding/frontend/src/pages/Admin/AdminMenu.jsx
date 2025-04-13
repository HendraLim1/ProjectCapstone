import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import hamburgerAnimation from '../../assets/animations/hamburger.json';
import closeAnimation from '../../assets/animations/close.json';
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineTags,
  AiOutlineOrderedList,
  AiOutlineTeam,
} from 'react-icons/ai';

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed top-5 right-7 flex items-start gap-3">
        {isMenuOpen && (
          <section className="bg-gray-800 p-4 rounded-lg shadow-lg w-[220px]">
            <ul className="list-none">
              {/* Admin Dashboard */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/dashboard"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineDashboard className="mr-2" size={18} />
                  <span>Admin Dashboard</span>
                </NavLink>
              </li>

              {/* Category List */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/categorylist"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineTags className="mr-2" size={18} />
                  <span>Create Category</span>
                </NavLink>
              </li>

              {/* Product List */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/productlist"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineAppstore className="mr-2" size={18} />
                  <span>Create Product</span>
                </NavLink>
              </li>

              {/* All Products */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/allproductslist"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineAppstore className="mr-2" size={18} />
                  <span>All Products</span>
                </NavLink>
              </li>

              {/* Manage Users */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/userlist"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineTeam className="mr-2" size={18} />
                  <span>Manage Users</span>
                </NavLink>
              </li>

              {/* Manage Orders */}
              <li className="mb-3">
                <NavLink
                  className="flex items-center py-2 px-1 hover:bg-gray-700 rounded-md transition-colors"
                  to="/admin/orderlist"
                  style={({ isActive }) => ({
                    color: isActive ? '#ec4899' : 'white',
                  })}
                >
                  <AiOutlineOrderedList className="mr-2" size={18} />
                  <span>Manage Orders</span>
                </NavLink>
              </li>
            </ul>
          </section>
        )}

        <button
          className="border border-gray-800 p-2 rounded-lg hover:bg-gray-800 hover:border-gray-800 transition-colors bg-white"
          onClick={toggleMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-6 h-6">
            <Lottie
              animationData={isMenuOpen ? closeAnimation : hamburgerAnimation}
              loop={false}
              autoplay={true}
              style={{
                width: '100%',
                height: '100%',
                filter: isHovered ? 'invert(1)' : 'none',
              }}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default AdminMenu;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {

  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/CurrDash.svg",
    to: "/scout/dashboard",
  },
  {
    id: "Players",
    label: "Browse Players",
    icon: "/country management.png",
    to: "/scout/browsePlayer",
  },
  {
    id: "Messages",
    label: "Messages",
    icon: "/category management.png",
    to: "/scout/messages",
  },

  {
    id: "settings",
    label: "Settings",
    icon: "/settings.png",
    to: "/scout/settings",
  },
];

const Sidebar = ({ onLogout, onSidebarState }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 
  
  const handleLogout = async () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to login page
  
  };

  // Responsive: detect mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg: 1024px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, sidebar is collapsed by default
  useEffect(() => {
    if (isMobile) setCollapsed(true);
    else setCollapsed(false);
    // eslint-disable-next-line
  }, [isMobile]);

  useEffect(() => {
    if (onSidebarState) onSidebarState(collapsed, isMobile);
  }, [collapsed, isMobile, onSidebarState]);

  // Sidebar classes
  const sidebarBase =
    "bg-white text-white transition-all duration-300 ease-in-out flex flex-col";
  // Use isMobile for all responsive logic
  const sidebarPosition = isMobile
    ? "fixed top-0 left-0 z-50 h-screen shadow-2xl"
    : "relative h-screen flex-shrink-0";
  const sidebarWidth = isMobile
    ? collapsed
      ? "w-16"
      : "w-64"
    : collapsed
    ? "w-16"
    : "w-72";

  // Get active tab from location
  const activeTab = navItems.find((item) => location.pathname === item.to)?.id;
  

  return (
    <div
      className={`${sidebarBase} ${sidebarPosition} ${sidebarWidth}`}
      style={{
        minHeight: 0,
        borderRight: "1px solid #F3EAFB",
        boxShadow: "4px 12px 12px 0 rgba(0, 0, 0, 0.15)",
        fontFamily: "'Sen', sans-serif",
      }}
    >
      <div className='flex flex-col flex-1 min-h-0'>
        <div className=' flex items-center justify-center h-24 px-4 py-10 '>
          <img
            src='/logo.png'
            alt='Logo'
            className={collapsed ? "h-8 w-auto" : "h-8 w-48"}
          />
        </div>
        <div
          className='flex-1 overflow-y-auto'
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <nav className='mt-4'>
            <ul className='flex flex-col items-stretch'>
              {navItems.map((item) => (
                <li key={item.id} className='mb-1 px-2'>
                  <Link
                    to={item.to}
                    className={`${
                      activeTab === item.id
                        ? "bg-primary_400  text-white"
                        : "text-black font-normal hover:bg-primary hover:bg-opacity-30"
                    } flex items-center w-full h-14 px-0 md:px-4 rounded-lg transition-colors duration-200 ease-in-out whitespace-nowrap cursor-pointer !rounded-button`}
                    style={
                      collapsed
                        ? {
                            width: "48px",
                            justifyContent: "center",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }
                        : { justifyContent: "flex-start" }
                    }
                    title={item.label}
                    aria-label={item.label}
                  >
                    
                    <span
                      className={`flex items-center justify-center ${
                        collapsed ? "w-full" : ""
                      }`}
                    >
                      <img src={item.icon} alt={`${item.label} icon`} />
                    </span>
                    {!collapsed && <span className='ml-4'>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div
        className={`p-2 border-t border-blue-400 border-opacity-30 space-y-3 flex flex-col ${
          collapsed ? "items-center" : ""
        }`}
      >
        <button
          className={`flex items-center ${
            collapsed
              ? "w-full justify-center px-0"
              : "w-full justify-start px-4"
          } h-10 text-white hover:bg-primary hover:bg-opacity-30 rounded-lg transition-colors duration-200 ease-in-out whitespace-nowrap cursor-pointer !rounded-button`}
          onClick={handleLogout}
        >
          <FaSignOutAlt className='text-sm bg-black' />
          {!collapsed && <span className='ml-2 text-black'>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center ${
            collapsed
              ? "w-full justify-center px-0"
              : "w-full justify-start px-4"
          } h-10 text-black hover:bg-primary hover:bg-opacity-30 rounded-lg transition-colors duration-200 ease-in-out whitespace-nowrap cursor-pointer !rounded-button`}
        >
          {collapsed ? (
            <FaChevronRight className='text-sm' />
          ) : (
            <FaChevronLeft className='text-sm' />
          )}
        </button>
      </div>
    </div>
  );
};

// Hide scrollbar for Webkit browsers

export default Sidebar;
  
import React, { useState, useCallback } from "react"; // 1. Import useCallback
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext"; // Import useAuth to use the logout function

const ClubAdminLayout = () => {
  // Assuming you want to manage the sidebar state here
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth(); 
  const handleSidebarStateChange = useCallback((collapsed, isMobile) => {
    setSidebarCollapsed(collapsed);
  }, []); // <-- Empty dependency array is key!

  const handleLogout = () => {
    logout();
    // Navigate to login page is handled by the HomeRedirect component
  };

  return (
    <div className='layout-container '>
   
      <main className='main-content'>
        <Outlet /> 
      </main>
    </div>
  );
};

export default ClubAdminLayout;

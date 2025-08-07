import React, { useState, useCallback } from "react"; // 1. Import useCallback
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext"; // Import useAuth to use the logout function

const ClubAdminLayout = () => {
  // Assuming you want to manage the sidebar state here
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth(); // Get the logout function from your context

  // 3. Wrap your handler function in useCallback.
  //    Because its dependency array [] is empty, this function will now be
  //    created only ONCE and will never be a "new" function on re-renders.
  const handleSidebarStateChange = useCallback((collapsed, isMobile) => {
    setSidebarCollapsed(collapsed);
  }, []); // <-- Empty dependency array is key!

  const handleLogout = () => {
    logout();
    // Navigate to login page is handled by the HomeRedirect component
  };

  return (
    <div className='layout-container flex'>
   
      <main className='main-content flex-1'>
        <Outlet /> {/* Club Admin pages will render here */}
      </main>
    </div>
  );
};

export default ClubAdminLayout;

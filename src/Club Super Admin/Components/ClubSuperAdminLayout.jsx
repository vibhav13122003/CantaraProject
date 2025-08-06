import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// You would import your specific Header/Sidebar components here

const ClubSuperAdminLayout = () => {
  return (
    <div className='layout-container'>
      
        <nav>
          <NavLink to='/club/dashboard'></NavLink>
          <NavLink to='/club/admin-management'></NavLink>
          <NavLink to='/club/activity-log'></NavLink>
          <NavLink to='/club/players'></NavLink>
          <NavLink to='/club/coaches'></NavLink>
          <NavLink to='/club/data-analyst'></NavLink>
          <NavLink to='/club/tournaments'></NavLink>
          <NavLink to='/club/scout-inquiries'></NavLink>
          <NavLink to='/club/settings'></NavLink>
        </nav>
    
      <main className='main-content'>
        <Outlet /> {/* Club Super Admin pages will render here */}
      </main>
    </div>
  );
};

export default ClubSuperAdminLayout;

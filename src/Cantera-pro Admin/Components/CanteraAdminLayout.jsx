import React from "react";
import { NavLink, Outlet } from "react-router-dom";


const CanteraAdminLayout = () => {
  return (
    <div className='layout-container'>
      <nav>
        <NavLink to='/cantera/dashboard'></NavLink>
        <NavLink to='/cantera/country'> </NavLink>
        <NavLink to='/cantera/categories'> </NavLink>
        <NavLink to='/cantera/clubs'></NavLink>
        <NavLink to='/cantera/tournaments'></NavLink>
        <NavLink to='/cantera/matches'></NavLink>
        <NavLink to='/cantera/scout'></NavLink>
        <NavLink to='/cantera/players'></NavLink>
        <NavLink to='/cantera/professionals'></NavLink>
        <NavLink to='/cantera/professional-categories'></NavLink>
        <NavLink to='/cantera/position'></NavLink>
        <NavLink to='/cantera/messages'></NavLink>
        <NavLink to='/cantera/settings'></NavLink>
      </nav>

      <main className='main-content'>
        <Outlet /> {/* Cantera Admin pages will render here */}
      </main>
    </div>
  );
};

export default CanteraAdminLayout;

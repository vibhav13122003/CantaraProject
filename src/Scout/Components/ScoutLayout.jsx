import React from "react";
import { NavLink, Outlet } from "react-router-dom";


const CoachLayout = () => {
  return (
    <div className='layout-container'>
      <nav>
        <NavLink to='/scout/dashboard'></NavLink>
        <NavLink to='/scout/browsePlayer'> </NavLink>
        <NavLink to='/scout/messages'> </NavLink>
        <NavLink to='/scout/settings'></NavLink>
      </nav>

      <main className='main-content'>
        <Outlet /> {/* coach Admin pages will render here */}
      </main>
    </div>
  );
};

export default CoachLayout;

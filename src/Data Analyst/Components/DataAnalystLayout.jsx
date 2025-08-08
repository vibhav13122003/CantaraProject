import React from "react";
import { NavLink, Outlet } from "react-router-dom";


const CoachLayout = () => {
  return (
    <div className='layout-container'>
      <nav>
        <NavLink to='/data/dashboard'></NavLink>
        <NavLink to='/data/dataanalystmatches'> </NavLink>
        <NavLink to='/data/Scorecard'> </NavLink>
        <NavLink to='/data/settings'></NavLink>
      </nav>

      <main className='main-content'>
        <Outlet /> {/* coach Admin pages will render here */}
      </main>
    </div>
  );
};

export default CoachLayout;

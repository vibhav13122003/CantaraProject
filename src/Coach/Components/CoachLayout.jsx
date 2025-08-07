import React from "react";
import { NavLink, Outlet } from "react-router-dom";


const CoachLayout = () => {
  return (
    <div className='layout-container'>
   
        <nav>
          <NavLink to='/coach/dashboard'></NavLink>
          <NavLink to='/coach/matchlineup'> </NavLink>
          <NavLink to='/coach/matchmanagement'> </NavLink>
          <NavLink to='/coach/playermanagement'></NavLink>
          <NavLink to='/coach/settings'></NavLink>
         
        </nav>
    
      <main className='main-content'>
        <Outlet /> {/* coach Admin pages will render here */}
      </main>
    </div>
  );
};

export default CoachLayout;

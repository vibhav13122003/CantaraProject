import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role) => {
    // 1. Call the login function from our context with the chosen role
    login(role);

    // 2. Navigate to the root. The HomeRedirect component will send the user
    //    to the correct dashboard.
    navigate("/");
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
        <img src='/logo.png' alt='logo' className='w-48 h-auto mx-auto mb-6' />
        <h1 className='text-2xl font-bold mb-6'>Development Login</h1>
        <p className='text-gray-600 mb-8'>
          Choose a role to view the corresponding UI.
        </p>
        <div className='space-y-4'>
          <button
            onClick={() => handleLogin("cantera_admin")}
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition'
          >
            Login as Cantera Admin
          </button>
          <button
            onClick={() => handleLogin("club_super_admin")}
            className='w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition'
          >
            Login as Club Super Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// --- Core Authentication and Login ---
import { AuthProvider, useAuth } from "./context/AuthContext"; // Ensure path is correct
import Login from "./Cantera-pro Admin/pages/Login"; // Assuming Login page is shared

// --- Layouts ---
import CanteraAdminLayout from "./Cantera-pro Admin/Components/CanteraAdminLayout";
import ClubSuperAdminLayout from "./Club Super Admin/Components/ClubSuperAdminLayout";

// --- Cantera Pro Admin Pages (from your comments) ---
import CanteraDashboard from "./Cantera-pro Admin/pages/Dashboard";
import CountryManagement from "./Cantera-pro Admin/pages/CountryManagement";
import CategoryManagement from "./Cantera-pro Admin/pages/CategoryManagement";
import ClubManagement from "./Cantera-pro Admin/pages/Club&LicenceManagement";
import CanteraTournamentManagement from "./Cantera-pro Admin/pages/TournamentManagement";
import MatchManagement from "./Cantera-pro Admin/pages/MatchManagement";
import ScoutManagement from "./Cantera-pro Admin/pages/ScoutManagement";
import ExternalPlayersManagement from "./Cantera-pro Admin/pages/ExternalPlayers";
import ExternalProfessional from "./Cantera-pro Admin/pages/ExternalProfessional";
import ProfessionalCategoriesManagement from "./Cantera-pro Admin/pages/ProfessionalCategoriesManagement";
import CanteraSettings from "./Cantera-pro Admin/pages/Settings";
import ScoutMessageCenter from "./Cantera-pro Admin/pages/Message";

// --- Club Super Admin Pages (your active routes) ---
import ClubDashboard from "./Club Super Admin/Pages/DashBoard";
import ClubAdminManagement from "./Club Super Admin/Pages/ClubAdminManagement";
import AdminActivityLog from "./Club Super Admin/Pages/AdminActivityLog";
import PlayerManagement from "./Club Super Admin/Pages/PlayerManagement";
import CoachManagement from "./Club Super Admin/Pages/CoachManagement";
import DataAnalystManagement from "./Club Super Admin/Pages/DataAnalystManagement";
import ClubTournamentManagement from "./Club Super Admin/Pages/TournamentManagement";
import ScoutInquiries from "./Club Super Admin/Pages/ScottInquiry";
import ClubSettings from "./Club Super Admin/Pages/Settings";

// This component handles redirection after login
const HomeRedirect = () => {
  const { user } = useAuth();
  if (user?.role === "cantera_admin") {
    return <Navigate to='/cantera/dashboard' replace />;
  }
  if (user?.role === "club_super_admin") {
    return <Navigate to='/club/dashboard' replace />;
  }
  return <Navigate to='/login' replace />;
};

function App() {
  return (
    // AuthProvider wraps EVERYTHING to prevent context errors
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC ROUTE --- */}
          <Route path='/login' element={<Login />} />

          {/* --- INITIAL REDIRECT LOGIC --- */}
          <Route path='/' element={<HomeRedirect />} />

          {/* --- CANTERA PRO ADMIN UI GROUP --- */}
          <Route element={<CanteraAdminLayout />}>
            <Route path='/cantera/dashboard' element={<CanteraDashboard />} />
            <Route path='/cantera/country' element={<CountryManagement />} />
            <Route
              path='/cantera/categories'
              element={<CategoryManagement />}
            />
            <Route path='/cantera/clubs' element={<ClubManagement />} />
            <Route
              path='/cantera/tournaments'
              element={<CanteraTournamentManagement />}
            />
            <Route path='/cantera/matches' element={<MatchManagement />} />
            <Route path='/cantera/scout' element={<ScoutManagement />} />
            <Route
              path='/cantera/players'
              element={<ExternalPlayersManagement />}
            />
            <Route
              path='/cantera/professionals'
              element={<ExternalProfessional />}
            />
            <Route
              path='/cantera/professional-categories'
              element={<ProfessionalCategoriesManagement />}
            />
            <Route path='/cantera/messages' element={<ScoutMessageCenter />} />
            <Route path='/cantera/settings' element={<CanteraSettings />} />
          </Route>

          {/* --- CLUB SUPER ADMIN UI GROUP --- */}
          <Route element={<ClubSuperAdminLayout />}>
            <Route path='/club/dashboard' element={<ClubDashboard />} />
            <Route
              path='/club/admin-management'
              element={<ClubAdminManagement />}
            />
            <Route path='/club/activity-log' element={<AdminActivityLog />} />
            <Route path='/club/players' element={<PlayerManagement />} />
            <Route path='/club/coaches' element={<CoachManagement />} />
            <Route
              path='/club/data-analyst'
              element={<DataAnalystManagement />}
            />
            <Route
              path='/club/tournaments'
              element={<ClubTournamentManagement />}
            />
            <Route path='/club/scout-inquiries' element={<ScoutInquiries />} />
            <Route path='/club/settings' element={<ClubSettings />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

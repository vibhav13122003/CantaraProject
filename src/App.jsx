import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// --- Core Authentication and Login ---
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./Cantera-pro Admin/pages/Login";

// --- Layouts ---
import CanteraAdminLayout from "./Cantera-pro Admin/Components/CanteraAdminLayout";
import ClubSuperAdminLayout from "./Club Super Admin/Components/ClubSuperAdminLayout";
import ClubAdminLayout from "./Club Admin/Components/ClubAdminLayout";
import CoachLayout from "./Coach/Components/CoachLayout";
import DataAnalystLayout from "./Data Analyst/Components/DataAnalystLayout";

// --- Cantera Pro Admin Pages ---
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

// --- Club Super Admin Pages ---
import ClubSuperAdminDashboard from "./Club Super Admin/Pages/DashBoard";
import ClubAdminManagement from "./Club Super Admin/Pages/ClubAdminManagement";
import AdminActivityLog from "./Club Super Admin/Pages/AdminActivityLog";
import SuperAdminPlayerManagement from "./Club Super Admin/Pages/PlayerManagement";
import SuperAdminCoachManagement from "./Club Super Admin/Pages/CoachManagement";
import SuperAdminDataAnalystManagement from "./Club Super Admin/Pages/DataAnalystManagement";
import SuperAdminTournamentManagement from "./Club Super Admin/Pages/TournamentManagement";
import SuperAdminScoutInquiries from "./Club Super Admin/Pages/ScottInquiry";
import SuperAdminSettings from "./Club Super Admin/Pages/Settings";

// --- Club Admin Pages ---
// We use 'as' to give duplicate components unique names
import ClubAdminDashboard from "./Club Admin/Pages/DashBoard";
import ClubAdminPlayerManagement from "./Club Admin/Pages/PlayerManagement";
import ClubAdminCoachManagement from "./Club Admin/Pages/CoachManagement";
import ClubAdminDataAnalystManagement from "./Club Admin/Pages/DataAnalystManagement";
import ClubAdminTournamentManagement from "./Club Admin/Pages/TournamentManagement";
import ClubAdminScoutInquiries from "./Club Admin/Pages/ScottInquiry";
import ClubAdminSettings from "./Club Admin/Pages/Settings";

// --- Coach Pages ---
import CoachDashboard from "./Coach/pages/Dashboard";
import CoachMatchManagement from "./Coach/pages/MatchManagement";
import MatchLineup from "./Coach/pages/MatchLineup";
import PlayerManagement from "./Coach/pages/PlayerManagement";
import Settings from "./Coach/pages/Settings";
import Messages from "./Coach/pages/Message";
// import Messages from "./Coach/Pages/Messages";


// --- Data Analyst Pages ---
import DataAnalystDashboard from "./Data Analyst/pages/Dashboard";
import DataAnalystMatches from "./Data Analyst/pages/DataAnalystMatches";
import Scoreboard from "./Data Analyst/pages/ScoreBoard";
import DataAnalystSettings from "./Data Analyst/pages/Settings";

// This component handles redirection after login
const HomeRedirect = () => {
  const { user } = useAuth();
  if (user?.role === "cantera_admin") {
    return <Navigate to='/cantera/dashboard' replace />;
  }
  if (user?.role === "club_super_admin") {
    return <Navigate to='/club/dashboard' replace />;
  }
  if (user?.role === "club_admin") {
    return <Navigate to='/clubAdmin/dashboard' replace />;
  }
   if (user?.role === "coach") {
     // --- ADDED THIS BLOCK ---
     return <Navigate to='/coach/dashboard' replace />;
   }
    if (user?.role === "data_analyst") {
      // --- ADDED THIS BLOCK ---
      return <Navigate to='/data/dashboard' replace />;
    }
  return <Navigate to='/login' replace />;
};

function App() {
  return (
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
            <Route
              path='/club/dashboard'
              element={<ClubSuperAdminDashboard />}
            />
            <Route
              path='/club/admin-management'
              element={<ClubAdminManagement />}
            />
            <Route path='/club/activity-log' element={<AdminActivityLog />} />
            <Route
              path='/club/players'
              element={<SuperAdminPlayerManagement />}
            />
            <Route
              path='/club/coaches'
              element={<SuperAdminCoachManagement />}
            />
            <Route
              path='/club/data-analyst'
              element={<SuperAdminDataAnalystManagement />}
            />
            <Route
              path='/club/tournaments'
              element={<SuperAdminTournamentManagement />}
            />
            <Route
              path='/club/scout-inquiries'
              element={<SuperAdminScoutInquiries />}
            />
            <Route path='/club/settings' element={<SuperAdminSettings />} />
          </Route>

          {/* --- CLUB ADMIN UI GROUP (This was the missing part) --- */}
          <Route element={<ClubAdminLayout />}>
            <Route
              path='/clubAdmin/dashboard'
              element={<ClubAdminDashboard />}
            />
            <Route
              path='/clubAdmin/players'
              element={<ClubAdminPlayerManagement />}
            />
            <Route
              path='/clubAdmin/coaches'
              element={<ClubAdminCoachManagement />}
            />
            <Route
              path='/clubAdmin/data-analyst'
              element={<ClubAdminDataAnalystManagement />}
            />
            <Route
              path='/clubAdmin/tournaments'
              element={<ClubAdminTournamentManagement />}
            />
            <Route
              path='/clubAdmin/scout-inquiries'
              element={<ClubAdminScoutInquiries />}
            />
            <Route path='/clubAdmin/settings' element={<ClubAdminSettings />} />
          </Route>
          <Route element={<CoachLayout />}>
            <Route path='/coach/dashboard' element={<CoachDashboard />} />
            <Route
              path='/coach/matchmanagement'
              element={<CoachMatchManagement />}
            />
            <Route path='/coach/matchlineup' element={<MatchLineup />} />
            <Route
              path='/coach/playermanagement'
              element={<PlayerManagement />}
            />
            <Route path='/coach/messages' element={<Messages />} />
            <Route path='/coach/settings' element={<Settings />} />
          </Route>

          {/* Data Analyst UI Group */}
          <Route element={<DataAnalystLayout />}>
            <Route path='/data/dashboard' element={<DataAnalystDashboard />} />
            <Route
              path='/data/dataanalystmatches'
              element={<DataAnalystMatches />}
            />
            <Route path='/data/Scorecard' element={<Scoreboard />} />
            <Route path='/data/settings' element={<DataAnalystSettings />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import Menu from './components/layout/menuBar/Menu';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import { validateToken } from './utils/ValidateToken';
import { useEffect } from 'react';
import { SidebarProvider } from './components/layout/sidebar/SidebarProvider';
import Sidebar from './components/layout/sidebar/Sidebar';
import CommunityPage from './pages/community/CommunityPage';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import PasswordResetEmailSent from './pages/auth/PassowrdResetEmailSent';
import PasswordResetConfirmPage from './pages/auth/PasswordResetConfirmPage';
import MainLayout from './components/layout/mainLayout/MainLayout';
import Owners from './components/Owners/Owners';
import NotFound404 from './pages/404';
import Properties from './components/property/Properties';
import Resolutions from './pages/resolutions/Resolutions';
import ResolutionDetails from './pages/resolutions/ResolutionDetails';
import Notifications from './pages/notifications/Notifications';
import BillingList from './components/property/bills/BillingList';
import { PropertyTab } from './types/propertiesTypes';
import Property from './components/property/Property';
import Billing from './components/property/bills/Billing';

const App = () => {
  // const isTokenValid = validateToken();
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (!isTokenValid) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [navigate, isTokenValid]);

  // const sidebarHidden = location.pathname === '/login';

  return (
    // <SidebarProvider>
    // <div className="App">
    // <Menu />
    // <div className="content">
    //   {!sidebarHidden && <Sidebar />}
    //   <main>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />
      <Route
        path="/reset-confirm/:uidb64/:token"
        element={<PasswordResetConfirmPage />}
      />
      <Route
        path="/password-reset-email-sent"
        element={<PasswordResetEmailSent />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<MainLayout />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/hoa/:communityID" element={<CommunityPage />} />
          <Route
            path="/hoa/:communityID/owners"
            element={<Owners key="owner" type={'owner'} />}
          />
          <Route
            path="/hoa/:communityID/managers"
            element={<Owners key="manager" type={'manager'} />}
          />
          <Route path="/hoa/:communityID/properties" element={<Properties />} />
          <Route
            path="/hoa/:communityID/properties/:propertyId"
            element={<Property />}
          />
          <Route
            path="/hoa/:communityID/billings"
            element={<Property currentTab={PropertyTab.billings} />}
          />
          <Route
            path="/hoa/:communityID/billings/:billingId"
            element={<Billing />}
          />
          <Route
            path="/hoa/:communityID/resolutions"
            element={<Resolutions key="resolutions" />}
          />
          <Route
            path="/hoa/:communityID/resolutions/:resolutionID"
            element={<ResolutionDetails key="resolution" />}
          />
          <Route
            path="/hoa/:communityID/notifications"
            element={<Notifications key="notifications" />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Route>
    </Routes>
    //   </main>
    // </div>
    // </div>
    // </SidebarProvider>
  );
};

export default App;

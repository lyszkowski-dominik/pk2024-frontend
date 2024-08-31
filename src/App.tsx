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
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<PasswordResetPage />} />
              <Route path="/reset-confirm/:uidb64/:token" element={<PasswordResetConfirmPage />} />
              <Route path="/password-reset-email-sent" element={<PasswordResetEmailSent />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/hoa/:communityID" element={<CommunityPage />} />
                  <Route path="/hoa/:communityID/owners" element={<Owners key="owner" type={'owner'} />} />
                  <Route path="*" element={<NotFound404 />}/>
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

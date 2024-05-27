import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Menu from './components/layout/menuBar/Menu';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import { validateToken } from './utils/ValidateToken';
import { useEffect } from 'react';
import { SidebarProvider } from './components/layout/sidebar/SidebarProvider';
import Sidebar from './components/layout/sidebar/Sidebar';
import CommunityPage from './pages/community/CommunityPage';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';

const App = () => {
  const isTokenValid = validateToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isTokenValid) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isTokenValid]);

  const sidebarHidden = location.pathname === '/login';

  return (
    <SidebarProvider>
      <div className="App">
        <Menu />
        <div className="content">
          {!sidebarHidden && <Sidebar />}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/hoa/:communityID" element={<CommunityPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;

import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import CommunityPage from './pages/community/CommunityPage';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import PasswordResetEmailSent from './pages/auth/PassowrdResetEmailSent';
import PasswordResetConfirmPage from './pages/auth/PasswordResetConfirmPage';
import MainLayout from './components/layout/mainLayout/MainLayout';
import NotFound404 from './pages/404';
import Properties from './pages/properties/Properties';
import Resolutions from './pages/resolutions/Resolutions';
import ResolutionDetails from './pages/resolutions/ResolutionDetails';
import Notifications from './pages/notifications/Notifications';
import { PropertyTab } from './features/properties/propertiesTypes';
import Property from './pages/properties/Property';
import Billing from './pages/billings/Billing';
import Requests from './pages/requests/Requests';
import ReqeustDetails from './pages/requests/RequestDetails';
import Users from './pages/users/Users';

const App = () => {
  return (
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
          <Route path="/hoa/:communityID/user-profile" element={<UserProfile />} />
          <Route path="/hoa/:communityID" element={<CommunityPage />} />
          <Route
            path="/hoa/:communityID/owners"
            element={<Users key="owner" type={'owner'} />}
          />
          <Route
            path="/hoa/:communityID/managers"
            element={<Users key="manager" type={'manager'} />}
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
          <Route
            path="/hoa/:communityID/requests"
            element={<Requests key="requests" />}
          />
          <Route
            path="/hoa/:communityID/requests/:requestID"
            element={<ReqeustDetails key="request" />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

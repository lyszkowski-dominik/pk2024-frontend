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
import MainLayout from './components/common/layout/mainLayout/MainLayout';
import NotFound404 from './pages/404';
import Properties from './pages/properties/Properties';
import Resolutions from './pages/resolutions/Resolutions';
import ResolutionDetails from './pages/resolutions/ResolutionDetails';
import Notifications from './pages/notifications/Notifications';
import { PropertyTab } from './features/properties/propertiesTypes';
import Property from './pages/properties/Property';
import BillingPage from './pages/billings/Billing';
import Requests from './pages/requests/Requests';
import ReqeustDetails from './pages/requests/RequestDetails';
import Users from './pages/users/Users';
import { UserRole } from './types/types';
import Charges from './pages/charges/Charges';
import { Buildings } from './pages/Buildings/Buildings';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import AdjustmentPage from './pages/billings/Adjustment';

const App = () => {
  dayjs.locale('pl');
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
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/hoa/:communityId" element={<CommunityPage />} />
          <Route
            path="/hoa/:communityId/owners"
            element={<Users key="owner" type={UserRole.Owner} />}
          />
          <Route
            path="/hoa/:communityId/managers"
            element={<Users key="manager" type={UserRole.Manager} />}
          />
          <Route path="/hoa/:communityId/properties" element={<Properties />} />
          <Route
            path="/hoa/:communityId/properties/:propertyId"
            element={<Property />}
          />
          <Route
            path="/hoa/:communityId/billings"
            element={<Property currentTab={PropertyTab.billings} />}
          />
          <Route
            path="/hoa/:communityId/charges/billings/:billingId"
            element={<BillingPage />}
          />
          <Route
            path="/hoa/:communityId/charges/adjustments/:adjustmentId"
            element={<AdjustmentPage />}
          />
          <Route
            path="/hoa/:communityId/resolutions"
            element={<Resolutions key="resolutions" />}
          />
          <Route
            path="/hoa/:communityId/resolutions/:resolutionId"
            element={<ResolutionDetails key="resolution" />}
          />
          <Route
            path="/hoa/:communityId/notifications"
            element={<Notifications key="notifications" />}
          />
          <Route
            path="/hoa/:communityId/requests"
            element={<Requests key="requests" />}
          />
          <Route
            path="/hoa/:communityId/requests/:requestId"
            element={<ReqeustDetails key="request" />}
          />
          <Route path="/hoa/:communityId/charges/" element={<Charges />} />
          <Route path="/hoa/:communityId/charges/:tab" element={<Charges />} />
          <Route path="/hoa/:communityId/buildings/" element={<Buildings />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

import { Routes, Route } from 'react-router-dom';
import Home from './routes/HomePage';
import FeedPage from './routes/FeedPage';
import ProfilePage from './routes/ProfilePage';
import UserProfilePage from './routes/UserProfilePage';
import FollowingPage from './routes/FollowingPage';
import FollowersPage from './routes/FollowersPage';
import UserFollowingPage from './routes/UserFollowingPage';
import UserFollowersPage from './routes/UserFollowersPage';
import PasswordSettingsPage from './routes/PasswordSettingsPage';
import ProfileSettingsPage from './routes/ProfileSettingsPage';
import EmailSettings from './routes/EmailSettingsPage';

const TodoApp = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:id" element={<UserProfilePage />} />
      <Route path="/following" element={<FollowingPage />} />
      <Route path="/followers" element={<FollowersPage />} />
      <Route path="/profile/:id/following" element={<UserFollowingPage />} />
      <Route path="/profile/:id/followers" element={<UserFollowersPage />} />
      <Route path="/settings/profile" element={<ProfileSettingsPage />} />
      <Route path="/settings/password" element={<PasswordSettingsPage />} />
      <Route path="/settings/email" element={<EmailSettings />} />
    </Routes>
  );
};
export default TodoApp;
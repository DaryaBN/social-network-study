import { Route, Routes } from "react-router-dom";
import EmailSettings from "./routes/EmailSettingsPage";
import FeedPage from "./routes/FeedPage";
import FollowersPage from "./routes/FollowersPage";
import FollowingPage from "./routes/FollowingPage";
import HashtagPage from "./routes/HashtagPage";
import Home from "./routes/HomePage";
import PasswordSettingsPage from "./routes/PasswordSettingsPage";
import ProfilePage from "./routes/ProfilePage";
import ProfileSettingsPage from "./routes/ProfileSettingsPage";
import UserFollowersPage from "./routes/UserFollowersPage";
import UserFollowingPage from "./routes/UserFollowingPage";
import UserProfilePage from "./routes/UserProfilePage";

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
			<Route path="/hashtag/:hashtag" element={<HashtagPage />} />
		</Routes>
	);
};
export default TodoApp;

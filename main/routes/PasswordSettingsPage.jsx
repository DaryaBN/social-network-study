import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Menu from "../components/feedMenu";
import SettingsPassword from "../components/settingsPassword.jsx";

function PasswordSettingsPage() {
	const feedResult = [{}];
	const [feedStstus, setFeedStstus] = useState(feedResult);
	const loadFeed = useCallback(async () => {
		const cook = await fetch("/DolphinFeed").then((data) => data.text());
		setFeedStstus(cook);
	}, []);
	useEffect(() => {
		loadFeed();
	}, [loadFeed]);

	if (feedStstus === "ok") {
		return (
			<>
				<Menu />
				<SettingsPassword />
			</>
		);
	} else if (feedStstus === "error") {
		return <Navigate to="/" replace />;
	}
}

export default PasswordSettingsPage;

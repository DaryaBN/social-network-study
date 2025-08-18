import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Menu from "../components/feedMenu";
import HashtagsPage from "../components/hashtagsPage";

const HashtagPage = () => {
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
				<HashtagsPage />
			</>
		);
	} else if (feedStstus === "error") {
		return <Navigate to="/" replace />;
	}
};

export default HashtagPage;

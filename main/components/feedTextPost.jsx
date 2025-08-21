import "../styles/feedPosts.css";
const FeedTextPost = ({ NameProps }) => {
	const Text = NameProps.map((item) => (
		<div className="LogicGreeting" key={item.id}>
			Что нового, {item.username}?
		</div>
	));
	return <>{Text}</>;
};
export default FeedTextPost;

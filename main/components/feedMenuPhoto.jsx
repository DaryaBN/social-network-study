import "../styles/Menu.css";

const MenuPhoto = ({ PhotoProps }) => {
	const PhotoInf = PhotoProps.map((item) => (
		<div className="menuUser" key={item.id}>
			{item.photo ? (
				<img className="menuUser" src={item.photo} alt="User" />
			) : (
				<div className="menuUser"></div>
			)}
		</div>
	));
	return <>{PhotoInf}</>;
};
export default MenuPhoto;

import '../styles/Menu.css';

const MenuPhoto = ({PhotoProps}) => {
  const PhotoInf = PhotoProps.map((item) => (
    <div className="menuUser" key={item.id}>
      <img className ="menuUser" src={item.photo} alt="пользователь"/>
    </div>
  ))
  return(
    <>
    {PhotoInf}
    </>
  )
}
export default MenuPhoto
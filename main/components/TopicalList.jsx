import "../styles/PostsBlog.css";
const TopicalList = ({TopProps}) => {
  const InfoTopical = TopProps.map((item) => (
    <div  className="topic" key={item.id}>
      <h4 className="topText">{item.hashtagname}</h4>
      <p  className="topNumber">{item.hashtaglot} сообщение</p> 
    </div>
  ))
  const InfoTopicalQuantity = [
    {id: "1"},
    {id: "2"},
    {id: "3"},
    {id: "4"},
    {id: "5"},
  ];
  const InfoTopicalColor = InfoTopicalQuantity.map((obj) => (
    <div  className="topic" key={obj.id}>
      <h4 className="topText color colorHeight"></h4>
      <p  className="topNumber color colorHeight colorWidth2"></p> 
    </div>
  ))
  if(TopProps == 0){
  return(
    <>
      {InfoTopicalColor}
    </>
  )}else {
    return(
      <>
        {InfoTopical}
      </>
    )
  }
}

export default TopicalList

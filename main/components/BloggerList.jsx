import "../styles/PostsBlog.css";
const BloggersList = ({BlogProps}) => {
  const InfoBloggers = BlogProps.map((item) => (
    <div  className="blogs" key={item.id}>
      <div className="blogIMG"></div>
      <div className="blogRead">Читать</div>
      <p className="blogName">{item.name}</p>
      <p className="blogNick">{item.nick}</p>
    </div>
  ));
  const InfoBloggersQuantity = [
    {id: "1"},
    {id: "2"},
    {id: "3"},
  ];
  const InfoBloggersColor = InfoBloggersQuantity.map((obj) => (
    <div  className="blogs" key={obj.id}>
      <div className="blogIMG color"></div>
      <div className="blogRead">Читать</div>
      <p className="blogName  color colorWidthNam"></p>
      <p className="blogNick color colorWidthNic"></p>
    </div>
  ));
  if(BlogProps == 0){
    return(
      <>
        {InfoBloggersColor}
      </>
    )
  } else {
    return(
      <>
        {InfoBloggers}
      </>
    )
  }
}
export default BloggersList

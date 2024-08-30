import '../styles/modal.css';
import "../styles/feedPosts.css"

const ModalPostetd = ({textProps, activePosted, setActivePosted}) => {
  return(
    <>
      <div className={activePosted ? "modal active" : "modal"} onClick={() => setActivePosted(false)}>
      <div className={activePosted ? "modalContent  active": "modalContent"}>
        <p className='textPosted'>{textProps.answerText}</p>  
      </div>
    </div>
    </>
  )   
}
export default ModalPostetd
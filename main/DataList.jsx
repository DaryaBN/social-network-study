import "./styles/Data.css";
const DataList = ({ dataProps }) => {
    // console.log(dataProps)
    const DataInformation = dataProps.map((item) => (
        <div className="DataBox" key={item}>
        <div className="boxData">
            <h1 className="NumberData">{item.user}</h1>
            <p className="boxTextData">Пользователей зарегистрировано</p>
        </div>
        <div className="boxData">
            <h1 className="NumberData">{item.ms}</h1>
            <p className="boxTextData">Сообщений написано</p>
        </div>
        <div className="boxData">
            <h1 className="NumberData">{item.msToday}</h1>
            <p className="boxTextData">Написано сегодня</p>
        </div>
    </div>
    ));
    return (
        <>{DataInformation}</>
    )
}
export default DataList
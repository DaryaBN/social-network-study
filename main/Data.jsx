import "./styles/Data.css";

const Data = () => {
    async function getResponse() {
        let response = await fetch('/Data1');
        let content = await response.json();
        let Registerde = document.querySelector('#Registerde');
        Registerde.textContent = content[0].count;
        let responseMes = await fetch('/DataMess');
        let contentMes = await responseMes.json();
        let WirteMsg = document.querySelector('#WirteMsg');
        WirteMsg.textContent = contentMes[0].count;
        let responseMesToday = await fetch('/DataMessToday');
        let contentMesToday = await responseMesToday.json();
        let WirteMsgToday = document.querySelector('#WirteMsgTodey');
        WirteMsgToday.textContent = contentMesToday;
      }
      getResponse()
    return(
        <>
        <div className="DataBox">
            <div className="boxData">
                <h1 className="NumberData" id="Registerde">0</h1>
                <p className="boxTextData">Пользователей зарегистрировано</p>
            </div>
            <div className="boxData">
                <h1 className="NumberData" id="WirteMsg">0</h1>
                <p className="boxTextData">Сообщений написано</p>
            </div>
            <div className="boxData">
                <h1 className="NumberData" id="WirteMsgTodey">0</h1>
                <p className="boxTextData">Написано сегодня</p>
            </div>
        </div>
        </>
    )

}
export default Data

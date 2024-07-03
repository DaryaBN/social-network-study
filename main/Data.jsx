import { useState } from "react";
import { useEffect } from 'react';
import DataList from "./DataList";
import "./styles/Data.css";

const Data = () => {
    let  information = [{
        user: 0,
        ms: 0,
        msToday:0
    }];
    const [inf, setInf] = useState(information);
    async function getInf(){
        const users = await fetch('/Data1').then((data) => data.json());
        const mess = await fetch('/DataMess').then((data) => data.json());
        const messToday = await fetch('/DataMessToday').then((data) => data.json());
        let resUsers;
        let resMess;
        let resToday;
        if(Array.isArray(users)){
            resUsers = users[0].count;
        }else{
            resUsers = 0;
        }
        if(Array.isArray(mess)){
            resMess = mess[0].count;
        }else{
            resMess = 0;
        }
        if(Array.isArray(messToday)){
            resToday = messToday[0].count;
        }else{
            resToday = 0;
        }
        setInf([{ user: resUsers, ms: resMess, msToday: resToday}]);
    }
    useEffect(() => {getInf()}, []);

    return(
        <>
        <DataList dataProps={inf}/>
        </>
    )

}
export default Data

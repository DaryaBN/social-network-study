import { useCallback, useEffect, useState } from "react";
import DataList from "./DataList";
import "../styles/Data.css";

const Data = () => {
	const information = [
		{
			user: 0,
			ms: 0,
			msToday: 0,
		},
	];
	const [inf, setInf] = useState(information);
	const getInf = useCallback(async () => {
		const users = await fetch("/DataUsers").then((data) => data.json());
		const mess = await fetch("/DataMess").then((data) => data.json());
		const messToday = await fetch("/DataMessToday").then((data) => data.json());
		let resUsers;
		let resMess;
		let resToday;
		if (Array.isArray(users)) {
			resUsers = users[0].count;
		} else {
			resUsers = 0;
		}
		if (Array.isArray(mess)) {
			resMess = mess[0].count;
		} else {
			resMess = 0;
		}
		if (messToday > 0) {
			resToday = messToday;
		} else {
			resToday = 0;
		}
		setInf([{ user: resUsers, ms: resMess, msToday: resToday }]);
	}, []);
	useEffect(() => {
		getInf();
	}, [getInf]);

	return <DataList dataProps={inf} />;
};
export default Data;

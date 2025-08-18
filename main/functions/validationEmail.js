export default function email(el) {
	const em = el.indexOf("@");
	if (em === -1 && (em === 0 || em === el.length - 1)) {
		return false;
	}
	const emOne = el.slice(0, em);
	const emTwo = el.slice(em + 1);

	if (emOne.length === 0) {
		return false;
	}
	const dotEmTwo = emTwo.indexOf(".");
	if (dotEmTwo === -1 || dotEmTwo === 0 || dotEmTwo === emTwo.length - 1) {
		return false;
	}
	return true;
}

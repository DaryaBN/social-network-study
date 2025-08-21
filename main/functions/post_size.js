export default function postSize(post) {
	const domain = ["https", "http", "www", ".org", ".com", ".ru"];
	let res;
	let indexDomain;
	const userPostSize = post.split(" ");
	userPostSize.forEach((eltment) => {
		domain.forEach((item) => {
			if (eltment.includes(item)) {
				indexDomain = userPostSize.indexOf(eltment);
			}
			userPostSize[indexDomain] = "";
			res = userPostSize.toString().length;
		});
	});
	return res;
}

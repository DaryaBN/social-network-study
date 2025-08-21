export default function hasht(txt, onHashtagClick) {
	const parts = [];
	const words = txt.split(" ");

	words.forEach((word) => {
		if (word.startsWith("#") && word.length > 1) {
			const key = `hashtag-${word}-${Math.random()}`;

			parts.push(
				<button
					type="button"
					key={key}
					style={{
						color: "blue",
						cursor: "pointer",
						background: "none",
						border: "none",
						padding: 0,
					}}
					onClick={(e) => {
						e.preventDefault();
						onHashtagClick(word.substring(1));
					}}
				>
					{word}
				</button>,
			);
		} else {
			parts.push(word);
		}
		if (
			parts.length &&
			parts[parts.length - 1] !== " " &&
			parts.length !== words.length * 2 - 1
		) {
			parts.push(" ");
		}
	});

	return parts;
}

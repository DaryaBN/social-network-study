export default function hasht(txt, onHashtagClick) {
  const parts = [];
  const words = txt.split(' '); 
  console.log(words)

  words.forEach((word, index) => {
    if (word.startsWith('#') && word.length > 1) {
      parts.push(
        <a
          key={index}
          href="#"
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            console.log(word)
            onHashtagClick(word.substring(1));
          }}
        >
          {word}
        </a>
      );
    } else {
      parts.push(word);
    }
    if (index !== words.length - 1) {
      parts.push(' ');
    }
  });

  return parts;
}

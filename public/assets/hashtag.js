export default function hashtag(txt) {
  let b;
  let c;
  let res;
  let a = txt.split(' ');
  a.forEach((elemet) => {
    if (elemet.includes('#')) {
      b = a.indexOf(elemet);
      c = elemet.substring(1);
    }
    a[b] = `<a href="/search?tag=${c}" >#${c}</a>`;
    res = a.join(' ');
  });
  return res;
}

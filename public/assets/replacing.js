export default function replacing(post) {
  const domain = ['.org', '.com', '.ru'];
  let res;
  const a = post.split(' ');
  a.forEach((eltment) => {
    domain.forEach((item) => {
      if (eltment.includes(item)) {
        a[a.indexOf(eltment)] = `<a href="https://${eltment}">${eltment}</a>`;
      }
      res = a.join(' ');
    });
  });
  return res;
}

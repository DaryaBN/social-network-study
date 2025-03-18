export default function postSize(post) {
  const domain = ['https', 'http', 'www', '.org', '.com', '.ru'];
  let res;
  let b;
  const a = post.split(' ');
  a.forEach((eltment) => {
    domain.forEach((item) => {
      if (eltment.includes(item)) {
        b = a.indexOf(eltment);
      }
      a[b] = '';
      res = a.toString().length;
    });
  });
  return res;
}

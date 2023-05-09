export default function platformFilter(arg1, arg2) {
  let res;
  let a = arg2;
  let b = arg1.split(' ');
  let c;
  b.forEach((eltment) => {
    a.forEach((item) => {
      if (eltment.toUpperCase().includes(item.toUpperCase())) {
        c = b.indexOf(eltment);
      }
      b[c] = '*****';
      res = b.join(' ');
    });
  });
  return res;
}

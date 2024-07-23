export default function validationEmail(em) {
  let res = (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
  return res.test(String(em).toLowerCase());
}

export default function validationEmail(em) {
  if( em.includes('@') && em.includes('.ru' || '.com')){
    return true
  } else {
    return false
  }
  // let res = (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
  // return res.test(String(em).toLowerCase());
}

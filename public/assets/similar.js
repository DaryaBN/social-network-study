export default function similar(profile, profiles, count1) {
  const objProfile = {};
  let elemProfile = [];
  let quantity = 1;
  const meaning = 0;
  let keyObj = [];
  let prof = [];
  const elemProfiles = [];
  const sum = 0;
  const res = [];
  let keys;

  elemProfile = profile.posts
    .join(' ')
    .split(' ')
    .filter((elemet) => elemet.includes('#'));
  elemProfile.forEach((element, index) => {
    objProfile[element] = quantity;
    if (element === elemProfile[index + 1]) {
      quantity += 1;
    }
  });

  keyObj = Object.keys(objProfile);

  profiles.forEach((element) => {
    let objProfiles = {};
    keyObj.forEach((elem) => {
      objProfiles[elem] = meaning;
      objProfiles.id = element.id;
      objProfiles.sum = sum;
      if (
        element.posts.toString().includes(elem) && objProfiles.id === element.id) {
        objProfiles[elem] += 1;
      }
    });
    elemProfiles.push(objProfiles);
  });

  elemProfiles.forEach((element) => {
    let el = element;
    keys = Object.keys(el);
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== 'id' && keys[i] !== 'sum') {
        el.sum += el[keys[i]];
      }
    }
  });
  elemProfiles.sort((a, c) => a.sum - c.sum);
  elemProfiles.reverse();
  elemProfiles.forEach((element) => {
    res.push(element.id);
  });
  if (elemProfiles.length <= count1) {
    prof = res;
  } else if (elemProfiles.length > count1) {
    prof = res.slice(0, count1);
  }
  return prof;
}

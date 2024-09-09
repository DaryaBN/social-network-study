export default function time(tim) {
  let tm = Math.round((new Date().getTime() - new Date(tim).getTime()) / 60000);
  let res;
  let resTime;
  if (tm < 60) {
    res = tm.toString();
    if (res === '1') {
      resTime = `${res} минуту назад`;
    } else if ((res < 5 || res > 20) && (res.endsWith(2) || res.endsWith(3) || res.endsWith(4))) {
      resTime = `${res} минуты назад`;
    } else {
      resTime = `${res} минут назад`;
    }
  }
  if (tm >= 60 && tm < 1440) {
    res = Math.round(tm / 60).toString();
    if (res === '1') {
      resTime = `${res} час назад`;
    } else if ((res < 5 || res > 20) && (res.endsWith(2) || res.endsWith(3) || res.endsWith(4))) {
      resTime = `${res} часа назад`;
    } else {
      resTime = `${res} часов назад`;
    }
  }
  if (tm >= 1440 && tm < 525600) {
    res = Math.round(tm / 1440).toString();
    if (res === '1') {
      resTime = `${res} день назад`;
    } else if ((res < 5 || res > 20) && (res.endsWith(2) || res.endsWith(3) || res.endsWith(4))) {
      resTime = `${res} дня назад`;
    } else {
      resTime = `${res} дней назад`;
    }
  }
  if (tm >= 525600) {
    res = Math.round(tm / 525600).toString();
    if (res === '1') {
      resTime = `более ${res} года назад`;
    } else if (res > 1) {
      resTime = `более ${res} лет назад`;
    }
  }
  return resTime;
}

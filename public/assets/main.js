// import postSize from './post_size.js';
// import replacing from './replacing.js';
import time from './timePost.js';
// import hashtag from './hashtag.js';
// import platformFilter from './censorshipFilter.js';
// import similar from './similar.js';

async function getResponse() {
  let response = await fetch('/assets/data.json');
  let content = await response.json();
  let Registerde = document.querySelector('#Registerde');
  Registerde.textContent = content.static.Registerde;
  let WirteMsg = document.querySelector('#WirteMsg');
  WirteMsg.textContent = content.static.WirteMsg;
  let WirteMsgTodey = document.querySelector('#WirteMsgTodey');
  WirteMsgTodey.textContent = content.static.WirteMsgTodey;
}

const modelController = ({
  modal, btnOpen, btnClose, btnCloseMobile,
}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);
  const buttonElemsMobile = document.querySelector(btnCloseMobile);

  modalElem.style.cssText = `
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  `;

  const closeModal = (event) => {
    const { target } = event;
    if (target === modalElem || target.closest(btnClose) || target.closest(btnCloseMobile)) {
      modalElem.style.opacity = 0;
      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      }, 300);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
  };

  buttonElems.forEach((btnOp) => {
    btnOp.addEventListener('click', openModal);
  });
  modalElem.addEventListener('click', closeModal);
  buttonElemsMobile.addEventListener('touchmove', closeModal);
};
modelController({
  modal: '.modal1',
  btnOpen: '.buttonOpen1',
  btnClose: '.SingInBlok1280',
  btnCloseMobile: '.SingInHandler',
});
modelController({
  modal: '.model2',
  btnOpen: '.buttonOpen2',
  btnClose: '.SingInBlok1280',
  btnCloseMobile: '.SingInHandler',
});

let form = document.querySelector('.SingUpBackground');
let nickname = form.querySelector('.nickname');
let email = form.querySelector('.email');
let password = form.querySelector('.password');
let passwordConfirmation = form.querySelector('.passwordConfirmation');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('nickname: ', nickname.value);
  console.log('email: ', email.value);
  console.log('password: ', password.value);
  console.log('passwordConfirmation: ', passwordConfirmation.value);

  let SingInInputs = form.querySelectorAll('.SingInInput'); // блок который нужно изменить
  let error1 = form.querySelectorAll('.SingInTextError');
  let error2 = form.querySelector('.SingInTextError1');
  let error3 = form.querySelector('.Error1');

  if (nickname.value.length <= 0) {
    error1[0].style.display = 'flex';
    SingInInputs[0].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (email.value.length <= 0) {
    error1[1].style.display = 'flex';
    SingInInputs[1].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (password.value.length <= 0) {
    error1[2].style.display = 'flex';
    SingInInputs[2].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (passwordConfirmation.value.length <= 0) {
    error1[3].style.display = 'flex';
    SingInInputs[3].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (password.value !== passwordConfirmation.value) {
    error3.style.display = 'flex';
    SingInInputs[2].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
    SingInInputs[3].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (!email.value.includes('.ru' || '.com')) {
    error2.style.display = 'flex';
    SingInInputs[1].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
});

let formIn = document.querySelector('.SingInBackground');
let nicknameIn = formIn.querySelector('.nickname');
let passwordIn = formIn.querySelector('.password');

formIn.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('nickname: ', nicknameIn.value);
  console.log('password: ', passwordIn.value);

  let SingInInputs = formIn.querySelectorAll('.SingInInput');
  let error1 = formIn.querySelectorAll('.SingInTextError');
  let error2 = formIn.querySelector('.SingInTextError1');
  let error3 = formIn.querySelector('.Error1');

  if (nicknameIn.value.length <= 0) {
    error1[0].style.display = 'flex';
    SingInInputs[0].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (!nicknameIn.value.includes('@')) {
    error2.style.display = 'flex';
    SingInInputs[0].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (passwordIn.value.length <= 0) {
    error1[1].style.display = 'flex';
    SingInInputs[1].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
  if (passwordIn.value.includes('1' || '0')) {
    error3.style.display = 'flex';
    SingInInputs[1].style.cssText = `
    background: #FFDEEC;
    border: 1px solid #E40060;
    `;
  }
});

async function getRes() {
  let response = await fetch('/assets/data.json');
  let content = await response.json();
  let res = await fetch('/assets/pictures.json');
  let con = await res.json();
  let profilePost = [];

  content.lastMessages.forEach((element) => {
    profilePost.push(element);
  });

  con.pictures.forEach((element) => {
    profilePost.forEach((item) => {
      let el = item;
      if (el.id === element.id) {
        el.img = element.img;
      }
    });
  });

  let blok = document.getElementsByTagName('aside');
  profilePost.forEach((item) => {
    let elements = document.createElement('div');
    let DatPublication = item.time;
    let DatNew = new Date();
    let milliseconds = DatNew.getTime() - new Date(DatPublication).getTime();
    let min = Math.round(milliseconds / 60000);

    elements.innerHTML = `
      <div class="BlokNews">
        <div class="BlokNewsPhoto prof">
          <img class="profile loading" src="${item.img}" alt="фото профиля"/>
        </div>
        <div class="BlokNewsInfoPost">
          <div class="BlokNameNickTime">
            <div class="BlokNameNick">
              <p class="name ">${item.name}</p>
              <p class="nick ">${item.nick}</p>
            </div>
            <p class="time" data-time=${item.time}>${time(min)}</p>
          </div>
          <p class="mes">${item.mes}</p>
          <ul class="cards">
            <li>
              <img class="function" src="../img/Vectorстрелка.svg" alt="поделиться"/>
              <p class="a">21</p>
            </li>
            <li>
              <img class="function" src="../img/Vectorнравится.svg" alt="нравиться"/>
              <p class="a">23</p>
            </li>
            <li>
              <img class="function" src="../img/Vectorскачать.svg" alt="скачать"/>
              <p class="a">9</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>`;
    blok[0].append(elements);
  });
}

async function AllBlocks() {
  let response = await fetch('/assets/data.json');
  let content = await response.json();
  let res = await fetch('/assets/pictures.json');
  let con = await res.json();
  let top = [];
  let blog = [];

  content.topics.forEach((element) => {
    top.push(element);
  });
  content.blogs.forEach((element) => {
    blog.push(element);
  });

  con.pictures.forEach((element) => {
    blog.forEach((item) => {
      let el = item;
      if (el.id === element.id) {
        el.img = element.img;
      }
    });
  });

  let blok = document.querySelector('.topic');
  top.forEach((item) => {
    let elements = document.createElement('div');
    elements.innerHTML = `
      <h4 class="top">${item}</h4>
      <p  class="numberOfPosts">2 941 сообщение</p>
    `;
    blok.append(elements);
  });

  let blok1 = document.querySelector('.blogs');
  blog.forEach((item) => {
    let elements = document.createElement('div');
    elements.innerHTML = `
      <img class="profileBack" src="${item.img}" alt="фото профиля"/>
      <div class="read">Читать</div>
      <p class="nameBack">${item.nameBack}</p>
      <p class="nickBack">${item.nickBack}</p>
    `;
    blok1.append(elements);
  });
}

setInterval(() => {
  let min1;
  let blokTm = document.querySelectorAll('.time');
  blokTm.forEach((item, index) => {
    let DatPublication1 = blokTm[index].dataset.time;
    let DatNew1 = new Date();
    let milliseconds1 = DatNew1.getTime() - new Date(DatPublication1).getTime();
    min1 = Math.round(milliseconds1 / 60000);
    blokTm[index].innerHTML = `
      <p class="time">${time(min1)}</p>
    `;
  });
}, 60000);

function animation() {
  return new Promise((resover) => {
    setTimeout(() => {
      let b = document.querySelector('.animationBlok');
      b.style.cssText = `
        display: none;
      `;
      resover();
    }, 5000);
  });
}

getResponse();
AllBlocks();

animation().then(() => {
  getRes();
});

// setInterval(postMin(), 60000);

// alert(postSize('Всем привет!'));

// alert(replacing('Привет! github.com'));

// alert(time(59));

// alert(hashtag('Кто еще изучает #javascript ?'));

// alert(platformFilter('Да вы что?? Охуели там?', ['охуели']));

// const profile = {
//   id: 256,
//   posts: [
//     'Привет. #сегодня был на концерте группы #linkinpark',
//     'как вам новая песня #linkinpark',
//   ],
// };
// const profiles = [
//   {
//     id: 257,
//     posts: [
//       'Сегодня вышла новая версия #javascript',
//       'как вам новая версия #javascript?',
//     ],
//   },
//   {
//     id: 258,
//     posts: [
//       '#сегодня мне не понравилась новая песня #linkinpark',
//     ],
//   },
// ];

// const count1 = 1;
// const count2 = 2;

// alert(similar(profile, profiles, count1));
// alert(similar(profile, profiles, count2));
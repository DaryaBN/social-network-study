// import postSize from './post_size.js';
// import replacing from './replacing.js';
// import time from './timePost.js';
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
    elements.innerHTML = `
      <div class="BlokNews">
        <div class="BlokNewsPhoto prof">
          <img class="profile loading" src="${item.img}" alt="фото профиля"/>
        </div>
        <div class="BlokNewsInfoPost">
          <div class="BlokNameNickTime">
            <div class="BlokNameNick">
              <p class="name loading">${item.name}</p>
              <p class="nick loading">${item.nick}</p>
            </div>
            <p class="time loading">${item.time}</p>
          </div>
          <p class="mes loading">${item.mes}</p>
          <ul class="cards">
            <li>
              <img class="function" src="../img/Vectorстрелка.svg" alt="поделиться"/>
              <p class="a loading">21</p>
            </li>
            <li>
              <img class="function" src="../img/Vectorнравится.svg" alt="нравиться"/>
              <p class="a loading">23</p>
            </li>
            <li>
              <img class="function" src="../img/Vectorскачать.svg" alt="скачать"/>
              <p class="a loading">9</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>`;
    blok[0].append(elements);
  });
}

function animation() {
  function func() {
    let b = document.querySelectorAll('.prof');
    b.forEach((elem) => {
      elem.style.cssText = `
      opacity: 0;
      `;
    });
    let a = document.querySelectorAll('.loading');
    a.forEach((item) => {
      item.style.cssText = `
      display: flex;
      color: #969696;
      background-color: #969696;
      `;
    });
  }
  setTimeout(func, 30);

  function func1() {
    let b = document.querySelectorAll('.prof');
    b.forEach((elem) => {
      elem.style.cssText = `
      opacity: 1;
      transition: opacity 300ms ease-in-out;
      `;
    });
    let a = document.querySelectorAll('.loading');
    a.forEach((item) => {
      item.style.cssText = `
      display: flex;
      visibility: visible;
      `;
    });
  }
  setTimeout(func1, 1000);
}

getRes();

getResponse();

animation();

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

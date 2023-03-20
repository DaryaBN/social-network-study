let Registerde = document.querySelector('#Registerde');
Registerde.textContent = 20;

let WirteMsg = document.querySelector('#WirteMsg');
WirteMsg.textContent = 556;

let WirteMsgTodey = document.querySelector('#WirteMsgTodey');
WirteMsgTodey.textContent = 58;

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

fetch('/assets/data.json').then((data) => {
  console.log(data.json());
}).catch(() => {
  console.log('Запрос не выполнен!');
});
// (async () => {
//   let DB = await(await fetch('data.json')).json();
//   console.log(DB);
// })();

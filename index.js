
let ПользователейЗарегистрировано = document.querySelector("#ПользователейЗарегистрировано")
console.log(ПользователейЗарегистрировано.textContent=20)

let СообщенийНаписано = document.querySelector("#СообщенийНаписано")
console.log(СообщенийНаписано.textContent=556)

let НаписаноСегодня = document.querySelector("#НаписаноСегодня")
console.log(НаписаноСегодня.textContent=58)

const modelController =({modal, btnOpen, btnClose, btnCloseMobile}) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);
    // const buttonElemsMobile = document.querySelector(btnCloseMobile)
    
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;

    const closeModal = event =>{
        const target = event.target;
        if ( target === modalElem ||
            target.closest(btnClose)
        ) {
            modalElem.style.opacity = 0;
            setTimeout(()=>{
                modalElem.style.visibility = "hidden";
            }, 300)
        }
    }

    const openModal = () => {
        modalElem.style.visibility = "visible";
        modalElem.style.opacity = 1;
    }

    buttonElems.forEach(btnOpen=> {
        btnOpen.addEventListener("click", openModal)
    })
    modalElem.addEventListener("click",closeModal)
    // buttonElemsMobile.addEventListener("swiped-down", closeModal)
}
modelController({
    modal: ".modal1",
    btnOpen: ".buttonOpen1",
    btnClose: ".SingInBlok1280",
    btnCloseMobile:".SingInHandler"
})
modelController({
    modal: ".model2",
    btnOpen: ".buttonOpen2",
    btnClose: ".SingInBlok1280",
    btnCloseMobile:".SingInHandler"
})
const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
let fullName = document.querySelector('.profile__fullname');
let profession = document.querySelector('.profile__profession');

openModalButton.addEventListener('click', () => {
    modal.classList.add('modal_opened');
})

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('modal_opened');


})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputName = document.querySelector('.form__input_name');
    let inputProf = document.querySelector('.form__input_prof');

    fullName.textContent = inputName.value;
    profession.textContent = inputProf.value;

    modal.classList.remove('modal_opened');
})

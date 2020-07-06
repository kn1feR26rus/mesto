const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
let fullName = document.querySelector('.profile__fullname');
let profession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.form__input_name');
let inputProf = document.querySelector('.form__input_prof');

function modalOpened() {
    modal.classList.add('modal_opened');
    inputName.value = fullName.textContent;
    inputProf.value = profession.textContent;
    }

function modalClosed() {
    modal.classList.remove('modal_opened');
}

function saveForm(event) {
    event.preventDefault();
    fullName.textContent = inputName.value;
    profession.textContent = inputProf.value;
    modalClosed();
}

openModalButton.addEventListener('click', modalOpened);
closeModalButton.addEventListener('click', modalClosed);
form.addEventListener('submit', saveForm);
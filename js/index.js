const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
let fullName = document.querySelector('.profile__fullname');
let profession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.form__input_name');
let inputProf = document.querySelector('.form__input_prof');

function modal_opened() {
    modal.classList.add('modal_opened');
    }
openModalButton.addEventListener('click', modal_opened);
    
function modal_closed() {
    modal.classList.remove('modal_opened');
}
closeModalButton.addEventListener('click', modal_closed);

function save_form(event) {
    event.preventDefault();
    fullName.textContent = inputName.value;
    profession.textContent = inputProf.value;
    modal_closed();
}
form.addEventListener('submit', save_form);




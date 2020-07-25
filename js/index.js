
//ПЕРЕМЕНКИ ПРОФАЙЛА
const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
let fullName = document.querySelector('.profile__fullname');
let profession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.form__input_name');
let inputProf = document.querySelector('.form__input_prof');


//ПЕРЕМЕНКИ СОЗДАНИЯ КАРТОЧКИ
const openAddButton = document.querySelector('.profile__add-btn');
const closeAddButton = document.querySelector('.addform__close-button');
const creatAddButton = document.querySelector('.addform__submit');
const addModal = document.querySelector('.addmodal');
const addForm = document.querySelector('.addform');
let addPlace = document.querySelector('.addform__input_place');
let addLink = document.querySelector('.addform__input_link');

// ДЕЙСТВИЯ ПРОФАЙЛА
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


//ДЕЙСТВИЯ ДОБАВЛЕНИЯ КАРТОЧКИ
function addModalOpened() {
    addModal.classList.add('addmodal_opened');
    }

function addModalClosed() {
    addModal.classList.remove('addmodal_opened');
}

openAddButton.addEventListener('click', addModalOpened);
closeAddButton.addEventListener('click', addModalClosed);


const els = document.querySelector('.elements');
const elInput = document.querySelector('.element__text');
const elImage = document.querySelector('.element__image');
const elSubmit = document.querySelector('.addform__submit');
const elTemplate = document.querySelector('.template')

const elements = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elList = () => {
    const items = elements.map(el => getItem(el));
    els.append(... items);
};


const getItem = data => {
    const elCard = elTemplate.content.cloneNode(true);
    elCard.querySelector('.element__text').innerText = data.title;
    elCard.querySelector('.element__image').setAttribute('src', data.link);
    return elCard;
}

const bindHandlers = () => {
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const item = getItem({
            title: addPlace.value,
            link: addLink.value
        });
        els.prepend(item);
        addModalClosed()
    })
    
}


elList();
bindHandlers();
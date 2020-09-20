import '../pages/index.css';
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";



//ПЕРЕМЕНКИ ПРОФАЙЛА
const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const form = document.querySelector('.form');
const inputName = document.querySelector('.form__input_name');
const inputProf = document.querySelector('.form__input_prof');
const elementContainerSelector = '.elements';
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

const renderer = data => {
    const handleCardClick = imgData => {
        imgPopup.open(imgData)
    }

    const card = new Card(data, '.template', handleCardClick);
    return card.createCard();
};

const sectionData = {
    items: elements,
    renderer: renderer
}

const section = new Section(sectionData, elementContainerSelector);

const userInfo = new UserInfo({
    name: '.profile__fullname',
    prof: '.profile__profession'
    });

const settings = {
    formSelector: '.form__valid',
    inputSelector: '.form__input',
    openModalSelector: '.open-modal-btn',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
    }

const createCardForm = document.querySelector('.form');
const createCardAddForm = document.querySelector('.addform');

//ПЕРЕМЕНКИ СОЗДАНИЯ КАРТОЧКИ
const openAddButton = document.querySelector('.profile__add-btn');
const closeAddButton = document.getElementById('add-close-button');
const creatAddButton = document.querySelector('.addform__submit');
const addModal = document.getElementById('addmodal');
const addForm = document.querySelector('.addform');
const addPlace = document.querySelector('.addform__input_place');
const addLink = document.querySelector('.addform__input_link');

function saveForm(formData) {
    userInfo.setUserInfo(
        formData['input_name'],
        formData['input_prof'])
    editPopup.close();  
}

function addFormCallback(formData) {
    const item = renderer({
        title: formData['input_place'],
        link: formData['input_link']
    });
    section.addItem(item);
    addPopup.close();
    };

const editPopup = new PopupWithForm('#editmodal', saveForm);
const addPopup = new PopupWithForm('#addmodal', addFormCallback);
const imgPopup = new PopupWithImage('#imgmodal');
editPopup.setEventListeners();
addPopup.setEventListeners();
imgPopup.setEventListeners();

// ВЫПОЛНЕНИЕ МОДАЛКИ ПРОФИЛЯ
openModalButton.addEventListener('click', () => {
    editPopup.open();
    const currentUserInfo = userInfo.getUserInfo();
    inputName.value = currentUserInfo.userName;
    inputProf.value = currentUserInfo.userInfo;
});

//ВЫПОЛНЕНИЕ МОДАЛКИ ДОБАВЛЕНИЯ КАРТОЧКИ
openAddButton.addEventListener('click', () => {
    addPopup.open();
});

const elementsBlock = document.querySelector('.elements');
const Template = document.querySelector('.template');

const formValidator = new FormValidator(settings, form);
const addFormValidator = new FormValidator(settings, addForm);

formValidator.enableValidation();
addFormValidator.enableValidation();

section.renderer();
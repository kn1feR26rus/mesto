import '../pages/index.css';
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";

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
    const handleRemoveClick = imgId => {
        const inputId = document.querySelector('#imgIdInput');
        inputId.value = imgId;
        deletePopup.open();

    }

    const handleLikeClick = (isLiked, cardId) => {
        const sendRequest = (isLiked, cardId) => {
            if (isLiked) {
                return api.setLike(cardId)
            } else {
                return api.deleteLike(cardId)
            }
        }

        sendRequest(isLiked, cardId)
            .then(cardData => {
                card.updateLikeCount(cardData.likes.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const card = new Card(data, '.template', handleCardClick, handleRemoveClick, userInfo, handleLikeClick);

    return card.getView();
};


let section = new Section({
    items: [],
    renderer: renderer
}, elementContainerSelector);

const userInfo = new UserInfo({
    name: '.profile__fullname',
    prof: '.profile__profession',
    avatar: '.profile__avatar'
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

//ПЕРЕМЕНКИ СОЗДАНИЯ КАРТОЧКИ
const openAddButton = document.querySelector('.profile__add-btn');
const addForm = document.querySelector('.addform');
const openEditAvatarPopup = document.querySelector('.profile__avatar');


function saveForm(formData) {
    const name = formData['input_name']
    const about = formData['input_prof']

    editPopup.showLoading();
    api.updateUserInfo(name, about)
        .then(updatedProfile => {
            userInfo.setUserInfo(
                updatedProfile.name,
                updatedProfile.about
            );

            editPopup.hideLoading();
            editPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function addFormCallback(formData) {
    const name = formData['input_place']
    const link = formData['input_link']

    addPopup.showLoading();
    api.createCard(name, link)
        .then(newCard => {
            const item = renderer(newCard);
            section.addItem(item, false);

            addPopup.hideLoading();
            addPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });

};

function avatarPopupCallback(formData) {
    const avatarLink = formData['input_avatarlink']
    avatarPopup.showLoading();
    api.updateAvatar(avatarLink)
        .then(data => {
            userInfo.setUserAvatarUrl(data.avatar)
            avatarPopup.hideLoading();
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function deleteFormCallback(formData) {
    const cardId = formData['imgIdInput']
    deletePopup.showLoading();
    api.deleteCard(cardId)
        .then(data => {
            console.log(data)
            const deleteCard = document.querySelector("#card-" + cardId);
            deleteCard.remove();
            deletePopup.hideLoading();
            deletePopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
};



const editPopup = new PopupWithForm('#editmodal', saveForm);
const addPopup = new PopupWithForm('#addmodal', addFormCallback);
const imgPopup = new PopupWithImage('#imgmodal');
const deletePopup = new PopupWithForm('#deletemodal', deleteFormCallback);
const avatarPopup = new PopupWithForm('#avatarmodal', avatarPopupCallback);
editPopup.setEventListeners();
addPopup.setEventListeners();
imgPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

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

openEditAvatarPopup.addEventListener('click', () => {
    avatarPopup.open();
});

const formValidator = new FormValidator(settings, form);
const addFormValidator = new FormValidator(settings, addForm);

formValidator.enableValidation();
addFormValidator.enableValidation();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
        authorization: '7f4720bc-3309-410e-9131-a823252c6faa',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo()
    .then(data => {
        userInfo.setUserInfo(
            data.name,
            data.about
        )
        userInfo.setUserAvatarUrl(data.avatar);
        userInfo.setUserId(data._id);
        console.log(data)

        api.getInitialCards()
            .then(cards => {
                const sectionData = {
                    items: cards,
                    renderer: renderer
                }
                section = new Section(sectionData, elementContainerSelector);
                section.renderer();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });


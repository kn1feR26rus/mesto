
//ПЕРЕМЕНКИ ПРОФАЙЛА
const openModalButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.form__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const fullName = document.querySelector('.profile__fullname');
const profession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.form__input_name');
const inputProf = document.querySelector('.form__input_prof');

//ПЕРЕМЕНКИ СОЗДАНИЯ КАРТОЧКИ
const openAddButton = document.querySelector('.profile__add-btn');
const closeAddButton = document.querySelector('.addform__close-button');
const creatAddButton = document.querySelector('.addform__submit');
const addModal = document.querySelector('.addmodal');
const addForm = document.querySelector('.addform');
const addPlace = document.querySelector('.addform__input_place');
const addLink = document.querySelector('.addform__input_link');

// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛОК
function modalOpened() {
    //модалка профиля
    modal.classList.add('modal_opened');
    inputName.value = fullName.textContent;
    inputProf.value = profession.textContent;

    //модалка добавления карточки
    addModal.classList.add('addmodal_opened');
    }

// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛОК

function modalClosed() {
    //модалка профиля
    modal.classList.remove('modal_opened');

    //модалка добавления карточки
    addModal.classList.remove('addmodal_opened');
}


function saveForm(event) {
    event.preventDefault();
    fullName.textContent = inputName.value;
    profession.textContent = inputProf.value;
    modalClosed();
}

// ВЫПОЛНЕНИЕ МОДАЛОК

openModalButton.addEventListener('click', modalOpened);
closeModalButton.addEventListener('click', modalClosed);
form.addEventListener('submit', saveForm);

openAddButton.addEventListener('click', modalOpened);
closeAddButton.addEventListener('click', modalClosed);

const elementsBlock = document.querySelector('.elements');
const Template = document.querySelector('.template')

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

const Cards = () => {
    const items = elements.map(el => getItem(el));
    elementsBlock.append(... items);
};

const handleRemove = evt => {
    evt.target.closest('.element').remove();
}

const getItem = data => {
    const elCard = Template.content.cloneNode(true);
    const elDelete = elCard.querySelector('.element__delete');
    const elLike = elCard.querySelector('.element__like');
    const elImg = elCard.querySelector('.element__image');
    const elTitle = elCard.querySelector('.element__text');
    const handleLike = evt => {
        evt.target.classList.toggle('element__like_black');
    }
    elTitle.innerText = data.title;
    elImg.src = data.link;
    elDelete.addEventListener('click', handleRemove);
    elLike.addEventListener('click', handleLike);
    
    
    const imgModal = document.querySelector('.imgmodal');
    const imgClose = document.querySelector('.imgmodal__close-button');
    const imgTitle = document.querySelector('.imgmodal__title');
    const openedImg = imgModal.querySelector('.imgmodal__img');
    const handleImg = evt => {
        openedImg.setAttribute('src', data.link);
        openedImg.setAttribute('alt', data.title);
        imgTitle.textContent = data.title;
        imgModal.classList.add('imgmodal_opened');
    }
    const deleteImg = evt => {
        imgModal.classList.remove('imgmodal_opened');
    }
    elImg.addEventListener('click', handleImg);
    imgClose.addEventListener('click', deleteImg);
    return elCard;
}

const bindHandlers = () => {
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const item = getItem({
            title: addPlace.value,
            link: addLink.value
        });
        elementsBlock.prepend(item);
        modalClosed()
    })
}

Cards();
bindHandlers();
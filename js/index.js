
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
const closeAddButton = document.getElementById('add-close-button');
const creatAddButton = document.querySelector('.addform__submit');
const addModal = document.getElementById('addmodal');
const addForm = document.querySelector('.addform');
const addPlace = document.querySelector('.addform__input_place');
const addLink = document.querySelector('.addform__input_link');

// ФУНКЦИЯ ОТКРЫТИЯ/ЗАКРЫТИЯ МОДАЛОК
function toggleModalVisible(tmodal) {
    tmodal.classList.toggle('modal_opened');

    if (tmodal.classList.contains('modal_opened')) {
        document.body.addEventListener('keydown', closeByKey);
        tmodal.addEventListener('click', clickCloseModal);
    } else {
        document.body.removeEventListener('click', closeByKey);
        tmodal.removeEventListener('click', clickCloseModal);
    }
}

function clickCloseModal(evt) {
    if (evt.target.classList.contains('modal_opened')) {
        evt.target.classList.remove('modal_opened');
    }
}

//ФУНКЦИЯ ЗАКРЫТИЯ НА "ESC"
function closeByKey(event) {
    const tmodal = document.querySelector('.modal_opened');
    if (event.key === 'Escape') {
        toggleModalVisible(tmodal);

    }
}

// ВЫПОЛНЕНИЕ МОДАЛКИ ПРОФИЛЯ
openModalButton.addEventListener('click', () => {
    toggleModalVisible(modal);
    inputName.value = fullName.textContent;
    inputProf.value = profession.textContent;
});

closeModalButton.addEventListener('click', () => {
    toggleModalVisible(modal);
});

function saveForm(event) {
    event.preventDefault();
    fullName.textContent = inputName.value;
    profession.textContent = inputProf.value;
    toggleModalVisible(modal);
}

form.addEventListener('submit', saveForm);

//ВЫПОЛНЕНИЕ МОДАЛКИ ДОБАВЛЕНИЯ КАРТОЧКИ
openAddButton.addEventListener('click', () => {
    toggleModalVisible(addModal);
    addPlace.value = '';
    addLink.value = '';
});

closeAddButton.addEventListener('click', () => {
    toggleModalVisible(addModal);
});

const elementsBlock = document.querySelector('.elements');
const Template = document.querySelector('.template');
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

const renderCards = () => {
    const items = elements.map(el => getItem(el));
    elementsBlock.append(...items);
};

const handleRemove = evt => {
    evt.target.closest('.element').remove();
};

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
    elImg.alt = data.title;
    elDelete.addEventListener('click', handleRemove);
    elLike.addEventListener('click', handleLike);

    //МОДАЛКА ИЗОБРАЖЕНИЯ
    const imgTitle = document.querySelector('.imgmodal__title');
    const openedImg = imgModal.querySelector('.imgmodal__img');
    const handleImg = evt => {
        openedImg.setAttribute('src', data.link);
        openedImg.setAttribute('alt', data.title);
        imgTitle.textContent = data.title;
        toggleModalVisible(imgModal);
    }
    elImg.addEventListener('click', handleImg);
    return elCard;
};

const imgModal = document.getElementById('imgmodal');
const imgClose = document.querySelector('.imgmodal__close-button');
imgClose.addEventListener('click', () => {
    toggleModalVisible(imgModal);
});

const bindHandlers = () => {
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const item = getItem({
            title: addPlace.value,
            link: addLink.value
        });
        elementsBlock.prepend(item);
        toggleModalVisible(addModal);
    })
};

renderCards();
bindHandlers();
export class Card {
    constructor(data, templateSelector, imgModal, toggleModalVisible) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.imgModal = imgModal;
        this.toggleModalVisible = toggleModalVisible;
        
    }

    _handleLike(evt){
        evt.target.classList.toggle('element__like_black');
    }

    _handleImg(evt) {
        this.openedImg.setAttribute('src', this.data.link);
        this.openedImg.setAttribute('alt', this.data.title);
        this.imgTitle.textContent = this.data.title;
        this.toggleModalVisible(this.imgModal);
    }

    _handleRemove(evt) {
        evt.target.closest('.element').remove();
    };

    _setEventListeners() {
        this.elDelete.addEventListener('click', (evt) => {
            this._handleRemove(evt);
        });
        this.elLike.addEventListener('click', (evt) => {
            this._handleLike(evt);
        });
        this.elImg.addEventListener('click', (evt) => {
            this._handleImg(evt);
        });
    }

    createCard() {
        const Template = document.querySelector(this.templateSelector);
        this.elCard = Template.content.cloneNode(true);
        this.elDelete = this.elCard.querySelector('.element__delete');
        this.elLike = this.elCard.querySelector('.element__like');
        this.elImg = this.elCard.querySelector('.element__image');
        this.elTitle = this.elCard.querySelector('.element__text');
       

        this.elTitle.innerText = this.data.title;
        this.elImg.src = this.data.link;
        this.elImg.alt = this.data.title;
        

        //МОДАЛКА ИЗОБРАЖЕНИЯ
        this.imgTitle = this.imgModal.querySelector('.imgmodal__title');
        this.openedImg = this.imgModal.querySelector('.imgmodal__img');
        this._setEventListeners();
    
        return this.elCard;
        
    }
    
}

export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        
    }

    _handleLike(evt) {
        evt.target.classList.toggle('element__like_black');
    }

    _handleImg(evt) {
        this.handleCardClick(this.imgModal);
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
            this.handleCardClick(this.data);
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
        
        this._setEventListeners();
    
        return this.elCard;
        
    }
    
}

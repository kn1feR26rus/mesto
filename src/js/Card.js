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

    _getTemplate() {
        const template = document.querySelector(this.templateSelector);
        return template.content.cloneNode(true);
        }

    getView() {
        const elCard = this._getTemplate();
        this.elDelete = elCard.querySelector('.element__delete');
        this.elLike = elCard.querySelector('.element__like');
        this.elImg = elCard.querySelector('.element__image');
        this.elTitle = elCard.querySelector('.element__text');
       
        this.elTitle.innerText = this.data.title;
        this.elImg.src = this.data.link;
        this.elImg.alt = this.data.title;
        
        this._setEventListeners();

        return elCard;
    }
    
}

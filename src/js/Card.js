export class Card {
    constructor(data, templateSelector, handleCardClick, handleRemoveClick, userInfo, handleLikeClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleRemoveClick = handleRemoveClick;
        this.userInfo = userInfo;
        this.handleLikeClick = handleLikeClick.bind(this);
    }



    _handleLike(evt) {
        const isLiked = evt.target.classList.contains('element__like_black');
        this.handleLikeClick(!isLiked, this.data._id);
    }

    setLikeState(isLiked) {
        if (isLiked) {
            this.elLike.classList.add('element__like_black');
        } else {
            this.elLike.classList.remove('element__like_black');
        }
    }

    _handleImg(evt) {
        this.handleCardClick(this.imgModal);
    }

    _handleRemove(evt) {
        // evt.target.closest('.element').remove();

        const id = this.data._id; // to do привязать модель
        this.handleRemoveClick(id, this)
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

    updateLikeCount(newLikeCount) {
        this.elCounter.textContent = newLikeCount
    }

    remove() {
        this.container.remove();
    }

    getView() {
        const elCard = this._getTemplate();
        this.container = elCard.querySelector('.element');
        this.container.id = 'card-' + this.data._id;

        this.elDelete = elCard.querySelector('.element__delete');
        this.elLike = elCard.querySelector('.element__like');
        this.elImg = elCard.querySelector('.element__image');
        this.elTitle = elCard.querySelector('.element__text');
        this.elCounter = elCard.querySelector('.element__like-counter');

        this.elTitle.innerText = this.data.name;
        this.elImg.src = this.data.link;
        this.elImg.alt = this.data.name;
        this.elCounter.textContent = this.data.likes.length

        this._setEventListeners();

        if (this.data.owner._id != this.userInfo.getUserId()) {
            this.elDelete.classList.add('element__delete_hide');
        }

        const myId = this.userInfo.getUserId()
        const isMeAlreadyLiked = this.data.likes.filter(user => {
            return user._id == myId
        }).length > 0
        if (isMeAlreadyLiked) {
            this.elLike.classList.add('element__like_black');
        }

        return elCard;
    }
}
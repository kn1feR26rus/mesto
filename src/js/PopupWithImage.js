import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imgTitle = this._popupContainer.querySelector('.imgmodal__title');
        this.openedImg = this._popupContainer.querySelector('.imgmodal__img');
    }

    open(imgData) {
        super.open();
        this.openedImg.setAttribute('src', imgData.link);
        this.openedImg.setAttribute('alt', imgData.title);
        this.imgTitle.textContent = imgData.title;
    }
}
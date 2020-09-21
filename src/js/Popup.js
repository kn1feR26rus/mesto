export class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector);
        this.closeButton = this._popupContainer.querySelector('.form__close-button');
        this._boundHandleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        if(!this._popupContainer.classList.contains('modal_opened')) {
            this._popupContainer.classList.add('modal_opened')
           
            document.addEventListener('keydown', this._boundHandleEscClose);
            }
    }

    close() {
        if(this._popupContainer.classList.contains('modal_opened')) {
            this._popupContainer.classList.remove('modal_opened')
           
            document.removeEventListener('keydown', this._boundHandleEscClose);
            }
    }

    _handleOverlayClose(event) {
        if (event.target.classList.contains('modal')) {
            this.close();
        }
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this.closeButton.addEventListener('click', () => {
            this.close()
            });
        this._popupContainer.addEventListener('click', (event) => {
            this._handleOverlayClose(event);
            });
    }
}
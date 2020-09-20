export class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector);
        this.closeButton = this._popupContainer.querySelector('.form__close-button');
    }

    open() {
        if(!this._popupContainer.classList.contains('modal_opened')) {
            this._popupContainer.classList.add('modal_opened')
           
            }
    }

    close() {
        if(this._popupContainer.classList.contains('modal_opened')) {
            this._popupContainer.classList.remove('modal_opened')
           
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
            if (event.target.classList.contains('modal')) {
                this.close()
                }
            });
            
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event)
        })
    }
}

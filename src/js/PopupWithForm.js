import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this.inputs = this._popupContainer.querySelectorAll('input');
        this.form = this._popupContainer.querySelector('form');
    }

    _getInputValues() {
        const _formValues = {};
        this.inputs.forEach( input => {
            _formValues[input.id] = input.value;
        })
        return _formValues;    
    }

    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const items = this._getInputValues();
            this._submitCallback(items);
        })
    }

    close() {
        super.close();
        this.inputs.forEach( input => {
            input.value = '';
        })
    }
}
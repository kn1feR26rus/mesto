export class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(settings, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  
  _hideInputError(settings, formElement, inputElement) {
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
  }
  
  _checkInputValidity(settings, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(settings, formElement, inputElement);
    }
  }

  _setToggleButtonListener(button) {
    button.addEventListener('click', function () {
    this._toggleButtonState(settings, inputList, buttonElement);
    });
    }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(settings, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
  
  _setEventListeners(settings, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    const openModalList = Array.from(document.querySelectorAll(settings.openModalSelector))
  
    for (let i = 0; i < openModalList.length; i++) {
      const openModalElement = openModalList[i];
       openModalElement.addEventListener('click',  () => {
         this._toggleButtonState(settings, inputList, buttonElement)
       });
     }
  
    this._toggleButtonState(settings, inputList, buttonElement);
  
    for (let i = 0; i < openModalList.length; i++) {
      const inputElement = inputList[i];
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(settings, formElement, inputElement);
        this._toggleButtonState(settings, inputList, buttonElement);
      });
    };
  };
  
  

  enableValidation() {
    this.formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners(this.settings, this.formElement);
  }
}


/*
enableValidation({
  formSelector: '.form__valid',
  inputSelector: '.form__input',
  openModalSelector: '.open-modal-btn',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
*/
class FormValidator {
  constructor(setting, element) {
    this._formElement = element;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._textErrorClass = setting.textErrorClass;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _visibleInputError(inputElement) {
    const errorInput = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorInput.classList.add(this._textErrorClass);
    errorInput.textContent = inputElement.validationMessage;
  }

  _invisibleInputError(inputElement) {
    const errorInput = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (inputElement.classList.contains(this._inputErrorClass)) {
      inputElement.classList.remove(this._inputErrorClass);
    }
    if (errorInput.classList.contains(this._textErrorClass)) {
      errorInput.classList.remove(this._textErrorClass);
    }
    errorInput.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._visibleInputError(inputElement);
    } else {
      this._invisibleInputError(inputElement);
    }
  }

  _invalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _changeSubmitButtonState() {
    if (this._invalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._invisibleInputError(inputElement);
    });
    this._changeSubmitButtonState();
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener("reset", (evt) => {
      setTimeout(() => {
        this._resetValidation();
      });
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._changeSubmitButtonState();
      });
    });
  }

  enableValidation() {
    this._changeSubmitButtonState();
    this._setEventListeners();
  }
}

export {
  FormValidator
};
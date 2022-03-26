import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._buttonSubmitElement =
      this._formElement.querySelector(".popup__button");
    this._textSubmitButtonDefault =
      this._buttonSubmitElement.innerText.valueOf();
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__textinput")
    );
    this._submitForm = submitForm;
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setLoadingState(state) {
    if (state) {
      this._buttonSubmitElement.innerText = "Сохранение...";
    } else {
      this._buttonSubmitElement.innerText = this._textSubmitButtonDefault;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setLoadingState(true);
      this._submitForm(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._setLoadingState(false);
    this._formElement.reset();
  }
}

export { PopupWithForm };

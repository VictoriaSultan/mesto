import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(evt, this._cardId)
      .then(this._callback)
      .catch((err) => {
        console.log(err);
      });
    });
  }

  open(cardId, callback) {
    this._cardId = cardId;
    this._callback = callback;
    super.open();
  }
}

export { PopupWithConfirmation };

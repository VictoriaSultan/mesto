class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popupElement = document.querySelector(selector);
    this._popupCloseElement = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutlineClose = this._handleOutlineClose.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOutlineClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseElement.addEventListener("click", this.close);
    this._popupElement.addEventListener("click", this._handleOutlineClose);
  }

  open() {
    this._popupElement.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export { Popup };

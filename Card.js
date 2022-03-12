import {
  openPopup
} from "./index.js";

const popupShowImage = document.querySelector("#popup-show-image");
const popupImage = popupShowImage.querySelector(".popup__image");
const popupDescription = popupShowImage.querySelector(".popup__description");

class Card {
  constructor(data, selector) {
    this._link = data.link;
    this._name = data.name;
    const cardTemplate = document.querySelector(selector).content;
    this._element = cardTemplate.querySelector(".element").cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");
  }

  _setContent() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._viewImage();
    });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._delete);
    this._element
      .querySelector(".element__icon-heart")
      .addEventListener("click", this._like);
  }

  _viewImage() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupDescription.textContent = this._name;
    openPopup(popupShowImage);
  }

  _delete(event) {
    event.target.closest(".element").remove();
  }

  _like(event) {
    event.target.classList.toggle("element__icon-heart_active");
  }

  compose() {
    this._setContent();
    this._setEventListeners();
    return this._element;
  }
}

export {
  Card
};
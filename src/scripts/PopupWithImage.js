import { Popup } from "./Popup.js";

// Создайте класс PopupWithImage, который наследует от Popup.
class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupDescription = this._popupElement.querySelector(
      ".popup__description"
    );
  }

  // Этот класс должен перезаписывать родительский метод open.
  // В методе open класса PopupWithImage нужно вставлять в попап
  // картинку с src изображения и подписью к картинке.
  open(item) {
    this._open();
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupDescription.textContent = item.name;
  }
}

export { PopupWithImage };

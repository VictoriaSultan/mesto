import { Popup } from "./Popup.js";

// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(selector, submitForm) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__textinput")
    );
    this._inputValues = {};
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // Перезаписывает родительский метод setEventListeners. 
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    this._popupCloseElement.addEventListener("click", () => {
      this.close();
    });
    this._formElement.addEventListener("submit", (evt) => {
      this._submitForm(evt, this._getInputValues());
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    this._close();
    this._formElement.reset();
  }
}

export { PopupWithForm };

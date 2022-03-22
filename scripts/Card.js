/*

  Свяжите класс Card c попапом. Сделайте так, 
  чтобы Card принимал в конструктор функцию handleCardClick.
  Эта функция должна открывать попап с картинкой при клике на карточку.

*/
class Card {
  constructor(data, selector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    const cardTemplate = document.querySelector(selector).content;
    this._element = cardTemplate.querySelector(".element").cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");
    this._buttonLike = this._element.querySelector(".element__icon-heart");
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
      .addEventListener("click", ()=>{ this._delete(); });
      this._buttonLike.addEventListener("click", ()=> { this._like(); });
  }

  _viewImage() {
    this._handleCardClick({
      link: this._link,
      name: this._name
    })
  }

  _delete(event) {
    this._element.remove();
    this._element = null;
  }

  _like(event) {
    this._buttonLike.classList.toggle("element__icon-heart_active");
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
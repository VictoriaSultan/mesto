/*

  Свяжите класс Card c попапом. Сделайте так, 
  чтобы Card принимал в конструктор функцию handleCardClick.
  Эта функция должна открывать попап с картинкой при клике на карточку.

*/
class Card {
  constructor(data, selector, handleCardClick, handleCardLike, ownerId) {
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._ownerId = ownerId;
    this._likes = data.likes.length;
    this._liked = this._hasLike(data.likes)
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    const cardTemplate = document.querySelector(selector).content;
    this._element = cardTemplate.querySelector(".element").cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");
    this._buttonLike = this._element.querySelector(".element__icon-heart");
    this._counterLike = this._element.querySelector(".element__heart-counter");

    this._viewImage = this._viewImage.bind(this)
    this._delete = this._delete.bind(this)
    this._delete = this._like.bind(this)

    if(this._liked){
      this._buttonLike.classList.add("element__icon-heart_active");
    }
  }

  _setContent() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._counterLike.textContent = this._likes;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", this._viewImage);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._delete);
      this._buttonLike.addEventListener("click", this._like);
  }

  _viewImage() {
    this._handleCardClick({
      link: this._link,
      name: this._name
    })
  }

  _hasLike(likes){
    const ownerFiltered = likes.filter((user) => {
      return user._id == this._ownerId;
    })
    if(ownerFiltered.length > 0){
      return true;
    }else{
      return false;
    }
  }

  _delete(event) {
    this._element.remove();
    this._element = null;
  }

  _like(event) {
    this._handleCardLike(this._cardId, this._liked)
    if(this._buttonLike.classList.contains("element__icon-heart_active")){
      this._buttonLike.classList.remove("element__icon-heart_active");
    }else{
      this._buttonLike.classList.add("element__icon-heart_active");
    }
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
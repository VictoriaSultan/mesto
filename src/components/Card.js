class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleCardLike,
    handleCardRemove,
    userId
  ) {
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardRemove = handleCardRemove;

    const cardTemplate = document.querySelector(selector).content;
    this._element = cardTemplate.querySelector(".element").cloneNode(true);
    this._elementImage = this._element.querySelector(".element__image");
    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementTitle = this._element.querySelector(".element__title");
    this._buttonLike = this._element.querySelector(".element__icon-heart");
    this._counterLike = this._element.querySelector(".element__heart-counter");
    this._likeActiveClass = "element__icon-heart_active";

    this._likes = data.likes.length;
    this._liked = this._hasLike(data.likes);

    this._viewImage = this._viewImage.bind(this);
    this._remove = this._remove.bind(this);
    this._delete = this._delete.bind(this);
    this._like = this._like.bind(this);
    this._updateLike = this._updateLike.bind(this);
  }

  _setContent() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._counterLike.textContent = this._likes;
    if (!this._isOwner() && this._elementDelete) {
      this._elementDelete.remove();
      this._elementDelete = null;
    }
    if (this._liked) {
      this._buttonLike.classList.add(this._likeActiveClass);
    }
  }

  _updateLike(cardData) {
    this._likes = cardData.likes.length;
    this._liked = this._hasLike(cardData.likes);
    this._counterLike.textContent = this._likes;
    if (this._liked) {
      this._buttonLike.classList.add(this._likeActiveClass);
    } else {
      if (this._buttonLike.classList.contains(this._likeActiveClass)) {
        this._buttonLike.classList.remove(this._likeActiveClass);
      }
    }
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", this._viewImage);
    this._buttonLike.addEventListener("click", this._like);
    if (this._isOwner()) {
      this._elementDelete.addEventListener("click", this._delete);
    }
  }

  _viewImage() {
    this._handleCardClick({
      link: this._link,
      name: this._name,
    });
  }

  _remove() {
    this._element.remove();
    this._element = null;
  }

  _delete(event) {
    this._handleCardRemove(this._id, this._remove);
  }

  _like(event) {
    this._handleCardLike(this._id, this._liked).then(this._updateLike);
  }

  _hasLike(likes) {
    const userFiltered = likes.filter((user) => {
      return user._id == this._userId;
    });
    if (userFiltered.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  _isOwner() {
    return this._ownerId == this._userId;
  }

  compose() {
    this._setContent();
    this._setEventListeners();
    return this._element;
  }
}

export { Card };

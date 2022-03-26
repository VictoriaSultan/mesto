class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._checkResponse = this._checkResponse.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  updateProfile(dataProfile) {
    return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: dataProfile.name,
          about: dataProfile.about,
        }),
      })
      .then(this._checkResponse)
  }

  addCard(dataCard) {
    return fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: dataCard.name,
          link: dataCard.link,
        }),
      })
      .then(this._checkResponse)
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  likeCard(cardId, like) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
        method: like ? "DELETE" : "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse)
  }

  setAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      })
      .then(this._checkResponse)
  }
}

export {
  Api
};
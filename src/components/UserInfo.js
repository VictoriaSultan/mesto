/*
    Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
        Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.

        Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

        Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutElement.textContent = data.about;
    this._userAvatarElement.src = data.avatar;
  }
}

export { UserInfo };

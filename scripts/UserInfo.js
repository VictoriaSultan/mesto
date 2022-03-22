/*
    Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
        Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.

        Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

        Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userJobElement.textContent = data.job;
  }
}

export { UserInfo };

class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._userNameData = "";
    this._userAboutData = "";
    this._userAvatarData = "";
    this._userId = "";
  }

  getUserInfo() {
    return {
      name: this._userNameData,
      about: this._userAboutData,
      avatar: this._userAvatarData,
      userId: this._userId
    };
  }

  setUserInfo(data) {
    this._userId = data._id;
    this._userNameData = data.name;
    this._userNameElement.textContent = data.name;
    this._userAboutData = data.about;
    this._userAboutElement.textContent = data.about;
    this._userAvatarData = data.avatar;
    this._userAvatarElement.src = data.avatar;
  }
}

export { UserInfo };
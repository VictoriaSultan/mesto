/*

    - Использованы ES6-классы.
    - Каждый класс описан в отдельном JS-файле и импортирован в index.js .
    - Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в классе.
    - Для описания взаимодействия между классами используется слабое связывание, то есть внутри классов напрямую не создаются экземпляры других классов.
    - Экземпляр класса Section создаётся для каждого контейнера, в который требуется отрисовывать элементы. Класс соответствует описанию из проектной работы.
    - Экземпляр класса Card создаётся для каждой карточки. Класс соответствует описанию из проектной работы.
    - Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Класс соответствует описанию из проектной работы.
    - Экземпляр класса UserInfo создается единожды. Класс соответствует описанию из проектной работы.
    - Класс Popup базовый, имеет двух наследников, которые создаются для каждого модального окна. Класс и наследники соответствуют описанию из проектной работы.

*/
import './index.css';
import { Api } from "../components/Api.js"
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const profileEditSelector = "#popup-edit-profile";
const profileNameSelector = "#profile-name";
const profileAboutSelector = "#profile-about";
const avatarEditSelector = "#popup-edit-avatar";

const cardAddSelector = "#popup-add-card";
const popupShowImageSelector = "#popup-show-image";
const sectionSelector = ".elements";
const elementTemplateSelector = "#element";

const cardAddButton = document.querySelector(".profile__add");
const cardAddForm = document.querySelector("#add-card");

const profileEditButton = document.querySelector(".profile__edit");
const profileEditForm = document.querySelector("#edit-form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

//test

const profileNameElement = document.querySelector(profileNameSelector);
const profileAboutElement = document.querySelector(profileAboutSelector);
const profileAvatarElement = document.querySelector("#profile-avatar");
const profileEditAvatar = document.querySelector(".profile__avatar-pen");
const cardRemoveForm = document.querySelector(".element__delete");

//


const validationSettings = {
  inputSelector: ".popup__textinput",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__textinput_invalid",
  textErrorClass: "popup__text-error_active",
};

const optionsApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '30d141e7-4c15-4471-802b-f050ee898489',
    'Content-Type': 'application/json'
  }  
}

const initUserInfo = (userInfo) => {
  profileNameElement.textContent = userInfo.name;
  profileAboutElement.textContent = userInfo.about;
  profileAvatarElement.src = userInfo.avatar;
}

const openEditProfilePopup = () => {
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.name;
  aboutInput.value = userInfo.about;
  profileEditPopupInstance.open();
};

const openAddCardPopup = () => {
  cardAddPopupInstance.open();
};

//test
const openEditProfileAvatarPopup = () => {
  // userInfoInstance.getUserInfo();
  avatarEditInstance.open();
}

const editProfileFormHandler = (evt, inputValues) => {
  evt.preventDefault();
  userInfoInstance.setUserInfo(inputValues);
  profileEditPopupInstance.close();
};

const addCardFormHandler = (evt, inputValues) => {
  evt.preventDefault();
  sectionInstance.addItem(createCard(inputValues));
  cardAddPopupInstance.close();
};

const handleCardClick = (item) => {
  popupImageInstance.open(item);
};

const handleCardLike = (cardId, like) => {
  return api.likeCard(cardId, like);
}

const createCard = (itemData) => {
  const currentCard = new Card(
    itemData,
    elementTemplateSelector,
    handleCardClick,
    handleCardLike,
    "8e59328c79c1db541331998f" // me id
  );
  return currentCard.compose();
};


const api = new Api(optionsApi);

const sectionInstance = new Section(
  {
    renderer: (itemData) => {
      sectionInstance.addItem(createCard(itemData));
    },
  },
  sectionSelector
);

api.getUserInfo().then((initialCardsData)=>{
  initUserInfo(initialCardsData);
})

api.getInitialCards().then((initialCardsData)=>{
  sectionInstance.renderItems(initialCardsData);
})

const userInfoInstance = new UserInfo(profileNameSelector, profileAboutSelector);

const profileEditPopupInstance = new PopupWithForm(
  profileEditSelector,
  editProfileFormHandler
);
profileEditPopupInstance.setEventListeners();

const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileEditFormValidator.enableValidation();

profileEditButton.addEventListener("click", openEditProfilePopup);

const cardAddPopupInstance = new PopupWithForm(
  cardAddSelector,
  addCardFormHandler
);
cardAddPopupInstance.setEventListeners();

const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

cardAddButton.addEventListener("click", openAddCardPopup);

const popupImageInstance = new PopupWithImage(popupShowImageSelector);
popupImageInstance.setEventListeners();

//test
profileEditAvatar.addEventListener("click", openEditProfileAvatarPopup);

const avatarEditInstance = new PopupWithForm(avatarEditSelector);
avatarEditInstance.setEventListeners();

//

import "./index.css";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const profileEditSelector = "#popup-edit-profile";
const profileNameSelector = "#profile-name";
const profileAboutSelector = "#profile-about";
const profileAvatarSelector = "#profile-avatar";
const avatarEditSelector = "#popup-edit-avatar";

const cardAddSelector = "#popup-add-card";
const cardRemoveSelector = "#popup-remove-card";
const popupShowImageSelector = "#popup-show-image";
const sectionSelector = ".elements";
const elementTemplateSelector = "#element";

const cardAddButton = document.querySelector(".profile__add");
const cardAddForm = document.querySelector("#add-card");

const profileEditButton = document.querySelector(".profile__edit");
const profileEditForm = document.querySelector("#edit-form");

const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");

const avatarEditArea = document.querySelector(".profile__avatar-pen");
const avatarEditForm = document.querySelector("#edit-avatar");

const validationSettings = {
  inputSelector: ".popup__textinput",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__textinput_invalid",
  textErrorClass: "popup__text-error_active",
};

const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
  headers: {
    authorization: "30d141e7-4c15-4471-802b-f050ee898489",
  },
};

const openEditProfilePopup = () => {
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.name;
  aboutInput.value = userInfo.about;
  profileEditPopupInstance.open();
};

const openAddCardPopup = () => {
  cardAddPopupInstance.open();
};

const openEditAvatarPopup = () => {
  avatarEditInstance.open();
};

const editProfileFormHandler = (evt, inputValues) => {
  api.updateProfile(inputValues).then((dataProfile) => {
    userInfoInstance.setUserInfo(dataProfile);
    profileEditPopupInstance.close();
  });
};

const addCardFormHandler = (evt, inputValues) => {
  const userData = userInfoInstance.getUserInfo();
  api.addCard(inputValues).then((dataCard) => {
    sectionInstance.addItem(createCard(dataCard, userData.userId));
    cardAddPopupInstance.close();
  });
};

const removeCardFormHandler = (evt, cardId) => {
  removeCardIntance.close();
  return api.removeCard(cardId);
};

const editAvatarFormHandler = (evt, inputValues) => {
  api.setAvatar(inputValues).then((dataProfile) => {
    userInfoInstance.setUserInfo(dataProfile);
    avatarEditInstance.close();
  });
};

const handleCardClick = (item) => {
  popupImageInstance.open(item);
};

const handleCardLike = (cardId, like) => {
  return api.likeCard(cardId, like);
};

const handleCardRemove = (cardId, remove) => {
  removeCardIntance.open(cardId, remove);
};

const createCard = (itemData, userId) => {
  const currentCard = new Card(
    itemData,
    elementTemplateSelector,
    handleCardClick,
    handleCardLike,
    handleCardRemove,
    userId
  );
  return currentCard.compose();
};

let sectionInstance = {};

const userInfoInstance = new UserInfo(
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector
);

const api = new Api(optionsApi);

// Получаем информацию о пользователе
api.getUserInfo().then((userData) => {
  userInfoInstance.setUserInfo(userData);
  // Делаем остальные запросы
  api.getInitialCards().then((initialCardsData) => {
    sectionInstance = new Section(
      {
        renderer: (itemData) => {
          sectionInstance.addItem(createCard(itemData, userData._id));
        },
      },
      sectionSelector
    );
    sectionInstance.renderItems(initialCardsData.reverse());
  });
});

// Определяем поведение форм

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

const avatarEditInstance = new PopupWithForm(
  avatarEditSelector,
  editAvatarFormHandler
);
avatarEditInstance.setEventListeners();

const avatarEditFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);
avatarEditFormValidator.enableValidation();

avatarEditArea.addEventListener("click", openEditAvatarPopup);

const cardAddPopupInstance = new PopupWithForm(
  cardAddSelector,
  addCardFormHandler
);
cardAddPopupInstance.setEventListeners();

const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

cardAddButton.addEventListener("click", openAddCardPopup);

const removeCardIntance = new PopupWithConfirmation(
  cardRemoveSelector,
  removeCardFormHandler
);
removeCardIntance.setEventListeners();

const popupImageInstance = new PopupWithImage(popupShowImageSelector);
popupImageInstance.setEventListeners();

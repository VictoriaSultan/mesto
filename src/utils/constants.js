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

export {
    profileEditSelector,
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
    avatarEditSelector,
    cardAddSelector,
    cardRemoveSelector,
    popupShowImageSelector,
    sectionSelector,
    elementTemplateSelector,
    cardAddButton,
    cardAddForm,
    profileEditButton,
    profileEditForm,
    nameInput,
    aboutInput,
    avatarEditArea,
    avatarEditForm,
    validationSettings,
    optionsApi
}
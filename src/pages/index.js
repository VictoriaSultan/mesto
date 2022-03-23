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
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const cardAddButton = document.querySelector(".profile__add");
const cardAddForm = document.querySelector("#add-card");

const profileEditButton = document.querySelector(".profile__edit");
const profileEditForm = document.querySelector("#edit-form");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

const profileEditSelector = "#popup-edit-profile";
const profileNameSelector = "#profile-name";
const profileJobSelector = "#profile-job";
const cardAddSelector = "#popup-add-card";
const popupShowImageSelector = "#popup-show-image";
const sectionSelector = ".elements";
const elementTemplateSelector = "#element";

const validationSettings = {
  inputSelector: ".popup__textinput",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__textinput_invalid",
  textErrorClass: "popup__text-error_active",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openEditProfilePopup = () => {
  profileEditForm.reset();
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profileEditPopupInstance.open();
};

const openAddCardPopup = () => {
  cardAddForm.reset();
  cardAddPopupInstance.open();
};

const editProfileFormHandler = (evt, inputValues) => {
  evt.preventDefault();
  userInfoInstance.setUserInfo(inputValues);
  profileEditPopupInstance.close();
};

const addCardFormHandler = (evt, inputValues) => {
  evt.preventDefault();
  sectionInstance.addItem(createCard(inputValues));
  cardAddForm.reset();
  cardAddPopupInstance.close();
};

const handleCardClick = (item) => {
  popupImageInstance.open(item);
};

const createCard = (itemData) => {
  const currentCard = new Card(
    itemData,
    elementTemplateSelector,
    handleCardClick
  );
  return currentCard.compose();
};

const sectionInstance = new Section(
  {
    items: initialCards,
    renderer: (itemData) => {
      return createCard(itemData);
    },
  },
  sectionSelector
);
sectionInstance.renderItems();

const userInfoInstance = new UserInfo(profileNameSelector, profileJobSelector);

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

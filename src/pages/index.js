import "./index.css";
import {
  Api
} from "../components/Api.js";
import {
  Card
} from "../components/Card.js";
import {
  UserInfo
} from "../components/UserInfo.js";
import {
  Section
} from "../components/Section.js";
import {
  FormValidator
} from "../components/FormValidator.js";
import {
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  PopupWithConfirmation
} from "../components/PopupWithConfirmation.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
import {
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
} from "../utils/constants.js"


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

const handleProfileFormSubmit = (evt, inputValues) => {
  api.updateProfile(inputValues).then((dataProfile) => {
    userInfoInstance.setUserInfo(dataProfile);
    profileEditPopupInstance.close();
  }).catch((err) => {
    console.log(err);
  });
};

const handleCardAddFormSubmit = (evt, inputValues) => {
  api.addCard(inputValues).then((dataCard) => {
    sectionInstance.addItem(createCard(dataCard));
    cardAddPopupInstance.close();
  }).catch((err) => {
    console.log(err);
  });
};

const handleCardRemoveFormSubmit = (evt, cardId) => {
  return api.removeCard(cardId)
    .catch((err)=>{
      console.log(err)
    });
};

const handleAvatarFormSubmit = (evt, inputValues) => {
  api.setAvatar(inputValues).then((dataProfile) => {
    userInfoInstance.setUserInfo(dataProfile);
    avatarEditInstance.close();
  }).catch((err) => {
    console.log(err);
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

const createCard = (itemData) => {
  const userData = userInfoInstance.getUserInfo();
  const currentCard = new Card(
    itemData,
    elementTemplateSelector,
    handleCardClick,
    handleCardLike,
    handleCardRemove,
    userData.userId
  );
  return currentCard.compose();
};

const userInfoInstance = new UserInfo(
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector
);

const sectionInstance = new Section({
    renderer: (itemData) => {
      sectionInstance.addItem(createCard(itemData));
    },
  },
  sectionSelector
);

const api = new Api(optionsApi);

// Получаем информацию о пользователе
api.getUserInfo().then((userData) => {
  userInfoInstance.setUserInfo(userData);
  // Делаем остальные запросы
  api.getInitialCards().then((initialCardsData) => {
    sectionInstance.renderItems(initialCardsData.reverse());
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log(err);
});

// Определяем поведение форм

const profileEditPopupInstance = new PopupWithForm(
  profileEditSelector,
  handleProfileFormSubmit
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
  handleAvatarFormSubmit
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
  handleCardAddFormSubmit
);
cardAddPopupInstance.setEventListeners();

const cardAddFormValidator = new FormValidator(validationSettings, cardAddForm);
cardAddFormValidator.enableValidation();

cardAddButton.addEventListener("click", openAddCardPopup);

const removeCardIntance = new PopupWithConfirmation(
  cardRemoveSelector,
  handleCardRemoveFormSubmit
);
removeCardIntance.setEventListeners();

const popupImageInstance = new PopupWithImage(popupShowImageSelector);
popupImageInstance.setEventListeners();
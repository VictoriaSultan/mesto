import {
    Card
} from "./Card.js";
import {
    FormValidator
} from "./FormValidator.js";

const editProfileForm = document.querySelector("#edit-form");
const addCardForm = document.querySelector("#add-card");
const popupEditProfile = document.querySelector("#popup-edit-profile");
const popupAddCard = document.querySelector("#popup-add-card");
const popupCloseElements = document.querySelectorAll(".popup__close");
const editProfileButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const cardNameInput = document.querySelector("#card-name-input");
const cardLinkInput = document.querySelector("#card-link-input");
const profileName = document.querySelector("#profile-name");
const profileJob = document.querySelector("#profile-job");
const cardsSection = document.querySelector(".elements");

const validationSettings = {
    inputSelector: ".popup__textinput",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
};

const initialCards = [{
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

const resetValidationEvent = new CustomEvent("resetValidation", {});

function openEditProfilePopup() {
    editProfileForm.reset();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

function openAddCardPopup() {
    addCardForm.reset();
    openPopup(popupAddCard);
}

function closePopupWithEscapeHandler(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup__opened").closest(".popup"));
    }
}

function closePopupByClickHandler(evt) {
    if (evt.target === this) {
        closePopup(this);
    }
}

function closePopup(popupInstance) {
    popupInstance.classList.remove("popup__opened");
    document.removeEventListener("keydown", closePopupWithEscapeHandler);
    popupInstance.removeEventListener("click", closePopupByClickHandler);
}

function openPopup(popupInstance) {
    popupInstance.classList.add("popup__opened");
    document.addEventListener("keydown", closePopupWithEscapeHandler);
    popupInstance.addEventListener("click", closePopupByClickHandler);
}

function editProfileFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

function addCardFormHandler(evt) {
    evt.preventDefault();
    addCard(cardsSection, createCard(cardNameInput.value, cardLinkInput.value));
    addCardForm.reset();
    closePopup(popupAddCard);
}

function createCard(name, link) {
    let currentCard = new Card({
            name: name,
            link: link,
        },
        "#element"
    );
    return currentCard.compose();
}

const editProfileFormValidator = new FormValidator(
    validationSettings,
    editProfileForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();

initialCards.forEach((cardData) => {
    addCard(cardsSection, createCard(cardData.name, cardData.link));
});

editProfileButton.addEventListener("click", openEditProfilePopup);
editProfileForm.addEventListener("submit", editProfileFormHandler);
addCardButton.addEventListener("click", openAddCardPopup);
addCardForm.addEventListener("submit", addCardFormHandler);
popupCloseElements.forEach((element) => {
    element.addEventListener("click", () => {
        closePopup(element.closest(".popup"));
    });
});

export {
    openPopup
};
const editProfileForm = document.querySelector('#edit-form');
const addCardForm = document.querySelector('#add-card');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const popupShowImage = document.querySelector('#popup-show-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupDescription = popupShowImage.querySelector('.popup__description');
const popupCloseElements = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');
const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-job');
const cardTemplate = document.querySelector('#element').content;
const cardsSection = document.querySelector('.elements');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const resetValidationEvent = new CustomEvent('resetValidation', {});

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

function openAddCardPopup() {
    openPopup(popupAddCard);
}

function closePopup(popupInstance) {
    popupInstance.classList.remove('popup__opened');
    const popupForm = popupInstance.querySelector('.popup__form');
    if (popupForm) {
        popupForm.dispatchEvent(resetValidationEvent);
        popupForm.reset();
    }
}

function closePopupWithEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup__opened').closest('.popup'));
    }
}

function openPopup(popupInstance) {
    popupInstance.classList.add('popup__opened');
    document.addEventListener('keydown', closePopupWithEscape);
    popupInstance.addEventListener('click', (evt) => {
        if (evt.target === popupInstance) {
            closePopup(popupInstance);
        }
    });
}

function editProfileFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function addCardFormHandler(evt) {
    evt.preventDefault();
    addCard(cardsSection, createCard(cardNameInput.value, cardLinkInput.value));
    addCardForm.reset();
    closePopup(popupAddCard);
}

function createCard(name, link) {
    const cardTemplateClone = cardTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardTemplateClone.querySelector('.element__image');
    elementImage.addEventListener('click', function (evt) {
        popupImage.src = link;
        popupImage.alt = name;
        popupDescription.textContent = name;
        openPopup(popupShowImage);
    });
    elementImage.src = link;
    elementImage.alt = name;
    cardTemplateClone.querySelector('.element__title').textContent = name;
    cardTemplateClone.querySelector('.element__delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    cardTemplateClone.querySelector('.element__icon-heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__icon-heart_active');
    });
    return cardTemplateClone;
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
    addCard(cardsSection, createCard(cardData.name, cardData.link));
});

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', editProfileFormHandler);
addCardButton.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', addCardFormHandler);
popupCloseElements.forEach((element) => {
    element.addEventListener('click', () => {
        closePopup(element.closest('.popup'));
    });
});
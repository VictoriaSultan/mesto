const editProfileForm = document.querySelector('#edit-form');
const addCardForm = document.querySelector('#add-card');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const popupShowImage = document.querySelector('#popup-show-image');
const editElement = document.querySelector('.profile__edit');
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

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    togglePopupVisibility(popupEditProfile);
}

function togglePopupVisibility(popupInstance) {
    popupInstance.classList.toggle('popup__opened');
}

function editProfileFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopupVisibility(popupEditProfile);
}

function addCardFormHandler(evt) {
    evt.preventDefault();
    addCard(cardsSection, createCard(cardNameInput.value, cardLinkInput.value));
    addCardForm.reset();
    togglePopupVisibility(popupAddCard);
}

function createCard(name, link) {
    const cardTemplateClone = cardTemplate.querySelector('.element').cloneNode(true);

    cardTemplateClone.querySelector('.element__image').addEventListener('click', function (evt) {
        popupShowImage.querySelector('.popup__image').src = link;
        popupShowImage.querySelector('.popup__image').alt = name;
        popupShowImage.querySelector('.popup__description').textContent = name;
        togglePopupVisibility(popupShowImage);
    });

    cardTemplateClone.querySelector('.element__image').src = link;
    cardTemplateClone.querySelector('.element__image').alt = name;
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

editElement.addEventListener('click', openPopup);
editProfileForm.addEventListener('submit', editProfileFormHandler);
addCardForm.addEventListener('submit', addCardFormHandler);

addCardButton.addEventListener('click', () => {
    togglePopupVisibility(popupAddCard);
});

document.querySelectorAll('.popup__close').forEach((element) => {
    element.addEventListener('click', () => {
        togglePopupVisibility(element.closest('.popup'));
    });
});
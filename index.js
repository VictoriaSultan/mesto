let formElement = document.querySelector('#edit-form');
let popupElement = document.querySelector('.popup');
let editElement = document.querySelector('.profile__edit');
let closeElement = document.querySelector('.popup__close');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#job-input');
let profileName = document.querySelector('#profile-name');
let profileJob = document.querySelector('#profile-job');

function tryOpen() {
    if (!popupElement.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        popupElement.classList.add('popup_opened');
    }
}

function tryClose() {
    if (popupElement.classList.contains('popup_opened')) {
        popupElement.classList.remove('popup_opened');
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    tryClose();
}

editElement.addEventListener('click', tryOpen);
closeElement.addEventListener('click', tryClose);
formElement.addEventListener('submit', formSubmitHandler);
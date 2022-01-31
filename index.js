const formElement = document.querySelector('#edit-form');
const popupElement = document.querySelector('.popup');
const editElement = document.querySelector('.profile__edit');
const closeElement = document.querySelector('.popup__close');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-job');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

editElement.addEventListener('click', openPopup);
closeElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
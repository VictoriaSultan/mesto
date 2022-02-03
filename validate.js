const visibleInputError = (formElement, inputElement, validationSettings) => {
    const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorInput.classList.add(validationSettings.errorClass);
    errorInput.textContent = inputElement.validationMessage;
};

const invisibleInputError = (formElement, inputElement, validationSettings) => {
    const errorInput = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.classList.contains(validationSettings.inputErrorClass)) {
        inputElement.classList.remove(validationSettings.inputErrorClass);
    }
    if (errorInput.classList.contains(validationSettings.errorClass)) {
        errorInput.classList.remove(validationSettings.errorClass);
    }
    errorInput.textContent = "";
};

const isValid = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        visibleInputError(formElement, inputElement, validationSettings);
    } else {
        invisibleInputError(formElement, inputElement, validationSettings);
    }
};

const invalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function changeSubmitButtonState(inputList, buttonElement, validationSettings) {
    if (invalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}

const initInputs = (formElement, validationSettings) => {
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    changeSubmitButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, validationSettings);
            changeSubmitButtonState(inputList, buttonElement, validationSettings);
        });
    });
};

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        formElement.addEventListener("resetValidation", (evt) => {
            resetValidation(evt.target, validationSettings);
        });
        initInputs(formElement, validationSettings);
    });
};

function resetValidation(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
        invisibleInputError(formElement, inputElement, validationSettings);
    });
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__textinput",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error_active",
});
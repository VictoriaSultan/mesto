
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
class Popup {

    // Принимает в конструктор единственный параметр — селектор попапа.
    constructor(selector){
        this._selector = selector;
        this._popupElement = document.querySelector(selector);
        this._popupCloseElement = this._popupElement.querySelector(".popup__close");
        // inputSelector
    }

    // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.close();
          }
    }

    // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    _handleOutlineClose(evt){
        if (evt.target === this._popupElement) {
            this.close();
          }
    }

    // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
    setEventListeners(){
        this._popupCloseElement.addEventListener("click", () => {
            this.close();
        });
    }

    // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    open(){
        this._popupElement.classList.add("popup__opened");
        document.addEventListener("keydown", (evt)=>{
            this._handleEscClose(evt)
        });
        this._popupElement.addEventListener("click", (evt)=>{
            this._handleOutlineClose(evt)
        });        
    }

    close(){
        this._popupElement.classList.remove("popup__opened");
        document.removeEventListener("keydown", (evt)=>{
            this._handleEscClose(evt)
        });
        this._popupElement.removeEventListener("click", (evt)=>{
            this._handleOutlineClose(evt)
        });          
    }

}

export {
    Popup
}
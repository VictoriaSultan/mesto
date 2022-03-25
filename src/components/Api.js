class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // 1. Загрузка информации о пользователе с сервера
    /*
        {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "e20537ed11237f86bbb20ccb",
            "cohort": "cohort0"
        }

        Используйте свойства name, about и avatar в соответствующих элементах шапки страницы. Свойство _id — это идентификатор пользователя, в данном случае вашего.
    */
    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // 2. Загрузка карточек с сервера
    /*
        [
        {
            "likes": [],
            "_id": "5d1f0611d321eb4bdcd707dd",
            "name": "Байкал",
            "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
            "owner": {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "ef5f7423f7f5e22bef4ad607",
            "cohort": "local"
            },
            "createdAt": "2019-07-05T08:10:57.741Z"
        },
        {
            "likes": [],
            "_id": "5d1f064ed321eb4bdcd707de",
            "name": "Архыз",
            "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
            "owner": {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "ef5f7423f7f5e22bef4ad607",
            "cohort": "local"
            },
            "createdAt": "2019-07-05T08:11:58.324Z"
        }
        ]

        Используйте этот массив при отображении предзагруженных карточек, а от предыдущего способа отображения первоначальных карточек избавьтесь.
        У каждой карточки есть свойства name и link — это заголовок и ссылка на картинку — они понадобятся при отображении каждой отдельной карточки.
        Как видите, у карточки также есть идентификатор — свойство _id. Сейчас он вам не нужен, но скоро понадобится.

    */
    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // 3. Редактирование профиля
    /*
        Отредактированные данные профиля должны сохраняться на сервере. Для этого отправьте запрос методом PATCH:
        PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me 
        В заголовках запроса, кроме токена, необходимо отправить Content-Type, а в теле — JSON с двумя свойствами — name и about. Значениями этих свойств должны быть обновлённые данные пользователя. Вот пример такого запроса:

        fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Marie Skłodowska Curie',
            about: 'Physicist and Chemist'
        })
        });

        Если обновление прошло успешно, в теле ответа от сервера вы получите обновлённые данные пользователя:
        {
        "name": "Marie Skłodowska Curie",
        "about": "Physicist and Chemist",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        "_id": "e20537ed11237f86bbb20ccb",
        "cohort": "cohort0",
        } 
        Метод PATCH обычно используют для обновления сущностей, уже существующих на сервере. Обновление информации о пользователе именно такой случай: пользователь уже есть, нужно просто обновить его данные.

    */

    // 4. Добавление новой карточки
    /*

        Чтобы добавить на сервер новую карточку, отправьте POST-запрос:
        POST https://mesto.nomoreparties.co/v1/cohortId/cards 
        В заголовках запроса, кроме токена, необходимо отправить Content-Type, а в теле — JSON с двумя свойствами — name и link. В name должно быть название создаваемой карточки, а в link — ссылка на картинку. Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки:
        {
            "likes": [],
            "_id": "5d1f0611d321eb4bdcd707dd",
            "name": "Байкал",
            "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
            "owner": {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "ef5f7423f7f5e22bef4ad607",
            "cohort": "local"
            },
            "createdAt": "2019-07-05T08:10:57.741Z"
        }, 


    */


    // 5. Отображение количества лайков карточки
    /*
        У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку:
        {
        "likes": [],
        ...другие данные карточки
        } 
        Сделайте так, чтобы на каждой карточке было написано, сколько у неё лайков:
        image
        Для этого придётся сверстать дополнительный элемент. Его дизайн есть в Фигме.
    */

    // 6. Попап удаления карточки
    /*
        Удаление чего-то, как правило, безвозвратно. Поэтому перед этим действием стоит спросить пользователя, уверен ли он, что хочет удалить карточку. Для этого сделайте новый попап. Он должен открываться по клику на иконку удаления:
        image
        Попап удаления карточки
        Дизайн попапа есть в Фигме.
    */

    // 7. Удаление карточки
    /*
        Прежде чем браться за работу с API, исправьте элемент карточки. Сделайте так, чтобы иконка удаления была только на созданных вами карточках, так как удалять чужие карточки нельзя.
        image
        Если карточка создана не вами, на ней нет иконки корзины
        После того, как сделаете это, реализуйте функциональность удаления карточки. Карточка должна удаляться, если в попапе удаления карточки пользователь нажал «Да».
        Чтобы удалить карточку, отправьте DELETE-запрос:
        DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId 
        Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. _id каждой карточки есть в её JSON:
        {
        "likes": [],
        "_id": "5d1f0611d321eb4bdcd707dd", — вот он
        ...другие данные карточки
        } 
        В итоге, запрос на удаление этой карточки должен выглядеть так:
        DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd 

    */

    // 8. Постановка и снятие лайка
    /*
        Чтобы лайкнуть карточку, отправьте PUT-запрос:
        PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes 
        Чтобы убрать лайк, нужно отправить DELETE-запрос с тем же URL:
        DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes 
        Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
        В ответе придёт обновлённый JSON с карточкой. Массив лайков в нём будет уже обновлён.
        При постановке и снятии лайка сердечко должно менять цвет, а счётчик лайков увеличиваться или уменьшаться.
        Чтобы изменить количество лайков, нужно отправить на сервер запрос с соответствующим методом. Рекомендуем брать количество лайков из ответа сервера, а не из вёрстки. Иначе могут возникнуть ошибки, когда два пользователя одновременно лайкнут одну карточку.
    */

    likeCard(cardId, like) {
        console.log(cardId, like)
        return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
                method: like ? 'DELETE' : 'PUT',
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then(res => {
                if (res.ok) {
                    console.log(res.json())
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // 9. Обновление аватара пользователя
    /*
        Чтобы сменить аватар, отправьте такой PATCH-запрос:
        PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
        В теле запроса передайте JSON с единственным свойством — avatar. Это свойство должно хранить ссылку на новый аватар. Если отправить не ссылку, сервер вернёт ошибку.
        При наведении указателя мыши на аватар, на нём должна появляться иконка редактирования:
        image
        А при клике, открываться форма. Эту форму нужно сделать. В ней должно быть одно поле — ссылка на новый аватар:
        image
        Иконка редактирования аватара и форма загрузки есть в Фигме.
    */

    // 10. Улучшенный UX всех форм
    /*
        Поработайте над UX. При редактировании профиля уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются:
        image
        Сделайте то же самое для формы добавления новой карточки и обновления аватара.
    */

    // 
    // 1. Не забывайте проверять, всё ли в порядке с ответом.
    // 2. Учитывайте случай, когда сервер вернул ошибку.
    // 3. Обрабатывайте ошибки, попадающие в catch
    // 4. Пользуйтесь вкладкой Network для просмотра запросов.
    // Не забудьте проверить себя по чеклисту: 
    // https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-9.pdf

}

export {
    Api
}

/*

    const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    }
    });

*/
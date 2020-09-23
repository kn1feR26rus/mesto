export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        //если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponseData);
    }


    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    setLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData);
    }

    updateAvatar(newAvatarUrl) {
        return fetch(this._baseUrl + '/users/me/avatar/', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatarUrl,
            })
        })
        .then(this._getResponseData);
    }

    updateUserInfo(name, about) {
        return fetch(this._baseUrl + '/users/me/', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._getResponseData);
    }

    createCard(name, link) {
        return fetch(this._baseUrl + '/cards/', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._getResponseData);
    }
}

export class UserInfo {
    constructor(selectors) {
        this.userName = document.querySelector(selectors.name);
        this.userInfo = document.querySelector(selectors.prof);
        this.userAvatar = document.querySelector(selectors.avatar);
    }
    getUserInfo() {
        return {
            userName: this.userName.textContent,
            userInfo: this.userInfo.textContent
            }
    }

    setUserInfo(newUserName, newUserInfo) {
        this.userName.textContent = newUserName;
        this.userInfo.textContent = newUserInfo;
    }

    setUserId(userId) {
        this._userId = userId
    }

    getUserId() {
        return this._userId
    }

    setUserAvatarUrl(newAvatar) {
        this.userAvatar.setAttribute('src', newAvatar);
    }
}
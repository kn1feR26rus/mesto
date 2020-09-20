export class UserInfo {
    constructor(selectors) {
        this.userName = document.querySelector(selectors.name);
        this.userInfo = document.querySelector(selectors.prof);
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
}
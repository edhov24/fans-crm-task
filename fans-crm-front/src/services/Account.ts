import Cookie from 'js-cookie';

export default class Account {
    static getToken = () => {
        return localStorage.getItem("token") || Cookie.get("token") || "";
    };

    static delete = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        Cookie.remove("token");
    };

    static setToken = (token: string) => {
        localStorage.setItem("token", token);
    }
}
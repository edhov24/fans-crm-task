import {api} from './Api'
export default class usersApi {
    static async userLogin(formData: {email: string, password: string}) {
        return api.post(`/api/v1/login-user`, {
            email: formData.email,
            password: formData.password,
        });
    }

    static async userSignUp(formData: {email: string, password: string}) {
        return api.post(`/api/v1/add-user`, {
            ...formData
        });
    }
}
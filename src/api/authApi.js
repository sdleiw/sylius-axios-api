import axios from 'axios'
import appConfig from '../../src/config'

export default {
    /**
     * POST | login
     *
     * @param {object} data login data object, email and password required
     * @returns {AxiosPromise} 200 | jwt token
     */
    login (data) {
        const payload = {
            _username: data.email,
            _password: data.password
        }

        return axios.post(appConfig.apiUrl + '/login_check', payload)
    },

    /**
     * POST | register User
     *
     * @param {object} data register data object, firstName, lastName, email, password required
     * @returns {AxiosPromise} 204 | no content
     */
    register (data) {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            plainPassword: data.password,
            channel: appConfig.apiChannel
        }

        return axios.post(appConfig.apiUrl + '/register', payload)
    },
    getMe (token) {
        return axios.get(appConfig.apiUrl + '/me', {
            headers: { Authorization: 'Bearer ' + token }
        })
    }
}

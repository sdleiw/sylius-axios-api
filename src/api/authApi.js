import axios from 'axios'
import appConfig from '../../src/config'

/**
 * auth api, login, register and fetch logged in user
 *
 * @module api/auth
 */
export default {
    /**
     * POST | login with email and password
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

    /**
     * GET | fetch logged in user with jwt token
     *
     * @param {string} token jwt token
     * @returns {AxiosPromise} 200 | user object
     */
    getMe (token) {
        return axios.get(appConfig.apiUrl + '/me', {
            headers: { Authorization: 'Bearer ' + token }
        })
    }
}
